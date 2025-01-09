import { SessionEntity } from '@rateme/core/domain/entities/session.entity';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';

export interface CreateSessionUseCase {
  createSession(command: CreateSessionCommand): Promise<SessionEntity | null>;
}

export interface CreateSessionCommand {
  user: UserEntity;
  ipAddress: string;
  userAgent: string | null;
}

export const CreateSessionUseCaseSymbol = Symbol('CreateSessionUseCase');
