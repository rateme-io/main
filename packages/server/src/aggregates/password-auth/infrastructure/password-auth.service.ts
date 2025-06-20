import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import {
  invalidTokenError,
  sessionNotFoundError,
  tokenExpiredError,
  tokenNotFoundError,
  wrongCredentialsError,
} from '@rateme/core/domain/dtos/token-auth/errors';
import { PasswordEntity } from '@rateme/core/domain/entities/password.entity';
import {
  SessionEntity,
  SessionStatus,
  TokenEntity,
} from '@rateme/core/domain/entities/session.entity';
import {
  UserEntity,
  UserVerifiedStatus,
} from '@rateme/core/domain/entities/user.entity';
import { EmailVo } from '@rateme/core/domain/value-objects/email.vo';
import { LogoUrlVo } from '@rateme/core/domain/value-objects/logo-url.vo';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { PasswordVo } from '@rateme/core/domain/value-objects/password.vo';
import { UsernameVo } from '@rateme/core/domain/value-objects/username.vo';

import {
  SessionUnitOfWork,
  SessionUnitOfWorkContext,
} from '@/aggregates/session/infrastructure';
import { ConfigService } from '@/core/modules/config';
import { CryptoService } from '@/core/modules/crypto';
import { DateService } from '@/core/modules/date';

import {
  CheckSessionCommand,
  LogoutCommand,
  PasswordAuthAbstractService,
  RefreshCommand,
  RegisterCommand,
  TokenLoginCommand,
  TokenSessionResponse,
} from '../domain';
import { PasswordAuthUnitOfWork } from './password-auth.unit-of-work';

@Injectable()
export class PasswordAuthService extends PasswordAuthAbstractService {
  constructor(
    @Inject(PasswordAuthUnitOfWork)
    private readonly passwordAuthUnitOfWork: PasswordAuthUnitOfWork,
    @Inject(SessionUnitOfWork)
    private readonly sessionUnitOfWork: SessionUnitOfWork,
    @Inject(CryptoService)
    private readonly cryptoService: CryptoService,
    @Inject(DateService)
    private readonly dateService: DateService,
    @Inject(ConfigService)
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async login(command: TokenLoginCommand): Promise<TokenSessionResponse> {
    return this.passwordAuthUnitOfWork.start(async (context) => {
      const user = await context.userRepository.findByEmail(command.email);

      if (!user) {
        throw new BadRequestException(wrongCredentialsError);
      }

      const password = await context.passwordRepository.findByUserId(user.id);

      if (!password) {
        throw new BadRequestException(wrongCredentialsError);
      }

      const isValidPassword = await this.cryptoService.verify(
        password.hash.getValue(),
        command.password,
      );

      if (!isValidPassword) {
        throw new BadRequestException(wrongCredentialsError);
      }

      return this.sessionUnitOfWork.start((sessionContext) =>
        this.createSession(
          {
            user,
            ipAddress: command.ipAddress,
            userAgent: command.userAgent,
          },
          sessionContext,
        ),
      );
    });
  }

  async register(command: RegisterCommand): Promise<TokenSessionResponse> {
    return this.passwordAuthUnitOfWork.start(async (context) => {
      const user = await context.userRepository.findByEmail(command.email);

      if (user) {
        throw new BadRequestException(wrongCredentialsError);
      }

      const userEntity = UserEntity.create({
        email: new EmailVo(command.email),
        name: new NameVo(command.name),
        username: new UsernameVo(command.username),
        logoUrl: new LogoUrlVo(null),
        verifiedStatus: UserVerifiedStatus.pending,
      });

      await userEntity.validate();

      const newUser = await context.userRepository.create(userEntity);

      const passwordHash = await this.cryptoService.hash(command.password);

      const passwordEntity = PasswordEntity.create({
        hash: new PasswordVo(passwordHash),
        user: newUser,
      });

      await passwordEntity.validate();

      await context.passwordRepository.create(passwordEntity);

      return this.sessionUnitOfWork.start((sessionContext) =>
        this.createSession(
          {
            user: newUser,
            userAgent: command.userAgent,
            ipAddress: command.ipAddress,
          },
          sessionContext,
        ),
      );
    });
  }

  async logout(command: LogoutCommand): Promise<void> {
    return this.sessionUnitOfWork.start(
      async ({ sessionRepository, tokenRepository }) => {
        const session = await sessionRepository.findById(command.sessionId);

        if (!session) {
          throw new BadRequestException(sessionNotFoundError);
        }

        session.status = SessionStatus.inactive;

        await sessionRepository.update(session);

        const token = await tokenRepository.findBySessionId(command.sessionId);

        if (token) {
          await tokenRepository.remove(token.id);
        }
      },
    );
  }

  async refresh(command: RefreshCommand): Promise<TokenSessionResponse> {
    return this.sessionUnitOfWork.start(async (context) => {
      const token = await context.tokenRepository.findBySessionId(
        command.sessionId,
      );

      if (!token) {
        throw new BadRequestException(tokenNotFoundError);
      }

      const hashed = await this.cryptoService.hash(command.refreshToken, true);
      if (hashed !== token.refreshToken) {
        throw new BadRequestException(invalidTokenError);
      }

      if (this.dateService.isAfter(new Date(), token.refreshTokenExpiresAt)) {
        throw new BadRequestException(tokenExpiredError);
      }

      await context.tokenRepository.remove(token.id);

      return this.createToken(
        {
          session: token.session,
          ipAddress: token.session.ipAddress,
          userAgent: token.session.userAgent,
        },
        context,
      );
    });
  }

  async checkSession(command: CheckSessionCommand): Promise<void> {
    return this.sessionUnitOfWork.start(async ({ tokenRepository }) => {
      const token = await tokenRepository.findBySessionId(command.sessionId);

      if (!token) {
        throw new BadRequestException(tokenNotFoundError);
      }

      const hashed = await this.cryptoService.hash(command.accessToken, true);
      if (hashed !== token.accessToken) {
        throw new BadRequestException(invalidTokenError);
      }

      if (this.dateService.isAfter(new Date(), token.accessTokenExpiresAt)) {
        throw new BadRequestException(tokenExpiredError);
      }
    });
  }

  async createSession(
    command: CreateSessionCommand,
    context: SessionUnitOfWorkContext,
  ): Promise<TokenSessionResponse> {
    const sessionEntity = SessionEntity.create({
      sessionId: this.cryptoService.generateHash(),
      userAgent: command.userAgent,
      ipAddress: command.ipAddress,
      status: SessionStatus.active,
      user: command.user,
    });

    await sessionEntity.validate();

    const session = await context.sessionRepository.create(sessionEntity);

    return await this.createToken(
      {
        session,
        ipAddress: command.ipAddress,
        userAgent: command.userAgent,
      },
      context,
    );
  }

  async createToken(
    command: CreateTokenCommand,
    { tokenRepository }: SessionUnitOfWorkContext,
  ): Promise<TokenSessionResponse> {
    const accessToken = this.cryptoService.generateHash();
    const refreshToken = this.cryptoService.generateHash();

    const tokenEntity = TokenEntity.create({
      accessToken: await this.cryptoService.hash(accessToken, true),
      refreshToken: await this.cryptoService.hash(refreshToken, true),
      session: command.session,
      accessTokenExpiresAt: this.dateService.addMinutes(
        new Date(),
        this.configService.auth.accessToken.expiresIn,
      ),
      refreshTokenExpiresAt: this.dateService.addMinutes(
        new Date(),
        this.configService.auth.refreshToken.expiresIn,
      ),
    });

    await tokenEntity.validate();

    const token = await tokenRepository.create(tokenEntity);

    return {
      accessToken,
      refreshToken,
      token,
    };
  }
}

export interface CreateSessionCommand {
  user: UserEntity;
  ipAddress: string;
  userAgent: string | null;
}

export interface CreateTokenCommand {
  session: SessionEntity;
  ipAddress: string;
  userAgent: string | null;
}
