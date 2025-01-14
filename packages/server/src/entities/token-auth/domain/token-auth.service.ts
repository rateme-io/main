import { UserAbstractRepository } from '@/entities/user/domain';
import { CryptoService } from '@/core/crypto';
import { SessionAbstractRepository } from '@/entities/session/domain';
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
  CreateSessionCommand,
  CreateTokenCommand,
  RefreshCommand,
  RegisterCommand,
  SessionResponse,
  TokenAuthAbstractService,
  TokenLoginCommand,
} from './token-auth.abstract.service';
import {
  PasswordAbstractRepository,
  TokenAbstractRepository,
} from './repositories';
import { DateService } from '@/core/date';
import { ConfigService } from '@/core/config';

export class TokenAuthService extends TokenAuthAbstractService {
  constructor(
    private readonly userRepository: UserAbstractRepository,
    private readonly passwordRepository: PasswordAbstractRepository,
    private readonly sessionRepository: SessionAbstractRepository,
    private readonly tokenRepository: TokenAbstractRepository,
    private readonly cryptoService: CryptoService,
    private readonly dateService: DateService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async login(command: TokenLoginCommand): Promise<SessionResponse> {
    const user = await this.userRepository.findByEmail(command.email);

    if (!user) {
      throw new UserNotFound();
    }

    const password = await this.passwordRepository.findByUserId(user.id);

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

    const token = await this.createSession({
      user,
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
    });

    return {
      token,
    };
  }

  async register(command: RegisterCommand): Promise<SessionResponse> {
    const user = await this.userRepository.findByEmail(command.email);

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

    const newUser = await this.userRepository.create(userEntity);

    const passwordHash = await this.cryptoService.hash(command.password);

    const passwordEntity = PasswordEntity.create({
      hash: new PasswordVo(passwordHash),
      user: newUser,
    });

    await passwordEntity.validate();

    await this.passwordRepository.create(passwordEntity);

    const token = await this.createSession({
      user: newUser,
      userAgent: command.userAgent,
      ipAddress: command.ipAddress,
    });

    return {
      token,
    };
  }

  async createSession(command: CreateSessionCommand): Promise<TokenEntity> {
    const sessionEntity = SessionEntity.create({
      sessionId: this.cryptoService.generateHash(),
      userAgent: command.userAgent,
      ipAddress: command.ipAddress,
      isActive: true,
      user: command.user,
    });

    await sessionEntity.validate();

    const session = await this.sessionRepository.create(sessionEntity);

    return await this.createToken({
      session,
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
    });
  }

  async createToken(command: CreateTokenCommand): Promise<TokenEntity> {
    const tokenEntity = TokenEntity.create({
      accessToken: this.cryptoService.generateHash(),
      refreshToken: this.cryptoService.generateHash(),
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

    return await this.tokenRepository.create(tokenEntity);
  }

  async refresh(command: RefreshCommand): Promise<SessionResponse> {
    const token = await this.tokenRepository.findByRefreshToken(
      command.refreshToken,
    );

    if (!token) {
      throw new UserNotFound();
    }

    if (this.dateService.isAfter(new Date(), token.refreshTokenExpiresAt)) {
      throw new UserNotFound();
    }

    await this.tokenRepository.remove(token.id);

    const newToken = await this.createToken({
      session: token.session,
      ipAddress: token.session.ipAddress,
      userAgent: token.session.userAgent,
    });

    return {
      token: newToken,
    };
  }

  async checkSession(command: CheckSessionCommand): Promise<boolean> {
    const token = await this.tokenRepository.findByAccessToken(
      command.accessToken,
    );

    if (!token) {
      return false;
    }

    if (this.dateService.isAfter(new Date(), token.accessTokenExpiresAt)) {
      return false;
    }

    return true;
  }
}
