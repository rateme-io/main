import { CryptoService } from '@/core/crypto';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';
import {
  SessionEntity,
  TokenEntity,
} from '@rateme/core/domain/entities/session.entity';
import {
  InvalidPassword,
  UserAlreadyExists,
  UserDoesntHavePassword,
  UserNotFound,
} from './errors';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { UsernameVo } from '@rateme/core/domain/value-objects/username.vo';
import { EmailVo } from '@rateme/core/domain/value-objects/email.vo';
import { LogoUrlVo } from '@rateme/core/domain/value-objects/logo-url.vo';
import { PasswordEntity } from '@rateme/core/domain/entities/password.entity';
import { PasswordVo } from '@rateme/core/domain/value-objects/password.vo';
import {
  CheckSessionCommand,
  LogoutCommand,
  RefreshCommand,
  RegisterCommand,
  TokenAuthAbstractService,
  TokenLoginCommand,
  TokenSessionResponse,
} from './token-auth.abstract.service';
import { DateService } from '@/core/date';
import { ConfigService } from '@/core/config';
import {
  TokenAuthAbstractUnitOfWork,
  TokenAuthUnitOfWorkContext,
} from './token-auth.abstract.unit-of-work';

export class TokenAuthService extends TokenAuthAbstractService {
  constructor(
    private readonly tokenAuthUnitOfWork: TokenAuthAbstractUnitOfWork,
    private readonly cryptoService: CryptoService,
    private readonly dateService: DateService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async login(command: TokenLoginCommand): Promise<TokenSessionResponse> {
    return this.tokenAuthUnitOfWork.start(async (context) => {
      const user = await context.userRepository.findByEmail(command.email);

      if (!user) {
        throw new UserNotFound();
      }

      const password = await context.passwordRepository.findByUserId(user.id);

      if (!password) {
        throw new UserDoesntHavePassword();
      }

      const isValidPassword = await this.cryptoService.verify(
        password.hash.getValue(),
        command.password,
      );

      if (!isValidPassword) {
        throw new InvalidPassword();
      }

      return await this.createSession(
        {
          user,
          ipAddress: command.ipAddress,
          userAgent: command.userAgent,
        },
        context,
      );
    });
  }

  async register(command: RegisterCommand): Promise<TokenSessionResponse> {
    return this.tokenAuthUnitOfWork.start(async (context) => {
      const user = await context.userRepository.findByEmail(command.email);

      if (user) {
        throw new UserAlreadyExists();
      }

      const userEntity = UserEntity.create({
        email: new EmailVo(command.email),
        name: new NameVo(command.name),
        username: new UsernameVo(command.username),
        logoUrl: new LogoUrlVo(null),
        isVerified: false,
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

      return await this.createSession(
        {
          user: newUser,
          userAgent: command.userAgent,
          ipAddress: command.ipAddress,
        },
        context,
      );
    });
  }

  async logout(command: LogoutCommand): Promise<void> {
    return this.tokenAuthUnitOfWork.start(
      async ({ sessionRepository, tokenRepository }) => {
        const session = await sessionRepository.findById(command.sessionId);

        if (!session) {
          throw new UserNotFound();
        }

        session.isActive = false;

        await sessionRepository.update(session);

        const token = await tokenRepository.findBySessionId(command.sessionId);

        if (token) {
          await tokenRepository.remove(token.id);
        }
      },
    );
  }

  async refresh(command: RefreshCommand): Promise<TokenSessionResponse> {
    return this.tokenAuthUnitOfWork.start(async (context) => {
      const token = await context.tokenRepository.findBySessionId(
        command.sessionId,
      );

      if (!token) {
        throw new UserNotFound();
      }

      if (
        command.refreshToken !==
        this.cryptoService.decrypt(
          token.refreshToken,
          this.configService.auth.encryptionKey,
        )
      ) {
        throw new UserNotFound();
      }

      if (this.dateService.isAfter(new Date(), token.refreshTokenExpiresAt)) {
        throw new UserNotFound();
      }

      await context.tokenRepository.remove(token.id);

      return await this.createToken(
        {
          session: token.session,
          ipAddress: token.session.ipAddress,
          userAgent: token.session.userAgent,
        },
        context,
      );
    });
  }

  async checkSession(command: CheckSessionCommand): Promise<boolean> {
    return this.tokenAuthUnitOfWork.start(async ({ tokenRepository }) => {
      const token = await tokenRepository.findBySessionId(command.sessionId);

      if (!token) {
        return false;
      }

      const decrypted = this.cryptoService.decrypt(
        token.accessToken,
        this.configService.auth.encryptionKey,
      );

      if (command.accessToken !== decrypted) {
        return false;
      }

      if (this.dateService.isAfter(new Date(), token.accessTokenExpiresAt)) {
        return false;
      }

      return true;
    });
  }

  async createSession(
    command: CreateSessionCommand,
    context: TokenAuthUnitOfWorkContext,
  ): Promise<TokenSessionResponse> {
    const sessionEntity = SessionEntity.create({
      sessionId: this.cryptoService.generateHash(),
      userAgent: command.userAgent,
      ipAddress: command.ipAddress,
      isActive: true,
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
    { tokenRepository }: TokenAuthUnitOfWorkContext,
  ): Promise<TokenSessionResponse> {
    const accessToken = this.cryptoService.generateHash();
    const refreshToken = this.cryptoService.generateHash();

    const tokenEntity = TokenEntity.create({
      accessToken: this.cryptoService.encrypt(
        accessToken,
        this.configService.auth.encryptionKey,
      ),
      refreshToken: this.cryptoService.encrypt(
        refreshToken,
        this.configService.auth.encryptionKey,
      ),
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
