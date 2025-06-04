import { SessionEntity } from '@rateme/core/domain/entities/session.entity';

export abstract class SessionAbstractService {
  abstract getSession(sessionId: string): Promise<SessionEntity>;
}
