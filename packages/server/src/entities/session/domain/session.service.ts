import {
  SessionEntity,
  TokenEntity,
} from '@rateme/core/domain/entities/session.entity';
import {
  CreateSessionCommand,
  CreateSessionUseCase,
  RefreshSessionUseCase,
  RemoveSessionUseCase,
} from './use-cases';
import {
  SessionAbstractRepository,
  TokenAbstractRepository,
} from '@/entities/session/domain/repositories';

export class SessionService
  implements CreateSessionUseCase, RefreshSessionUseCase, RemoveSessionUseCase
{
  constructor(
    private readonly sessionRepository: SessionAbstractRepository,
    private readonly tokenRepository: TokenAbstractRepository,
  ) {}

  async createSession({
    user,
    userAgent,
    ipAddress,
  }: CreateSessionCommand): Promise<SessionEntity | null> {
    const session = new SessionEntity();

    session.user = user;
    session.sessionId = `sessionId-${Date.now()}`;
    session.userAgent = userAgent;
    session.ipAddress = ipAddress;
    session.isActive = true;

    const token = new TokenEntity();

    token.accessToken = `accessToken-${Date.now()}`;
    token.refreshToken = `refreshToken-${Date.now()}`;
    token.expiresAt = new Date();

    console.log(token);

    session.token = await this.tokenRepository.create(token);

    console.log(session);

    return await this.sessionRepository.create(session);
  }

  refreshSession(): void {
    throw new Error('Method not implemented.');
  }

  removeSession(): void {
    throw new Error('Method not implemented.');
  }
}
