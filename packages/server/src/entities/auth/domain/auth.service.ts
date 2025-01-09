import {
  LoginCommand,
  LoginUseCase,
  RegisterCommand,
  RegisterUseCase,
} from './use-cases';
import { UserAbstractRepository } from '@/entities/user/domain';
import { CryptoService } from '@/core/crypto';
import {
  CreateSessionUseCase,
  RemoveSessionUseCase,
  SessionAbstractRepository,
} from '@/entities/session/domain';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';
import { SessionEntity } from '@rateme/core/domain/entities/session.entity';

export class AuthService implements LoginUseCase, RegisterUseCase {
  constructor(
    private readonly userRepository: UserAbstractRepository,
    private readonly createSession: CreateSessionUseCase,
    private readonly removeSession: RemoveSessionUseCase,
    private readonly refreshTokenRepository: SessionAbstractRepository,
    private readonly cryptoService: CryptoService,
  ) {}

  async login(command: LoginCommand): Promise<SessionEntity> {
    const user = await this.userRepository.findByEmail(command.email);
    const hash = await this.userRepository.findPasswordHash(command.email);

    if (!hash || !user) {
      throw new Error('User not found');
    }

    const isValidPassword = await this.cryptoService.verify(
      hash,
      command.password,
    );

    if (!isValidPassword) {
      throw new Error('Invalid password');
    }

    const session = await this.createSession.createSession({
      user,
      ipAddress: command.ipAddress,
      userAgent: command.userAgent,
    });

    if (!session) {
      throw new Error('Failed to create session');
    }

    return session;
  }

  async register(command: RegisterCommand): Promise<SessionEntity> {
    const user = await this.userRepository.findByEmail(command.email);

    if (user) {
      throw new Error('User already exists');
    }

    const password = await this.cryptoService.hash(command.password);

    const userEntity = new UserEntity();

    userEntity.name = command.name;
    userEntity.username = command.username;
    userEntity.email = command.email;
    userEntity.isVerified = false;

    await userEntity.validate();

    const newUser = await this.userRepository.create(userEntity, password);

    const session = await this.createSession.createSession({
      user: newUser,
      userAgent: command.userAgent,
      ipAddress: command.ipAddress,
    });

    if (!session) {
      throw new Error('Failed to create session');
    }

    return session;
  }
}
