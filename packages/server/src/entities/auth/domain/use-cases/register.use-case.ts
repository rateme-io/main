import { SessionEntity } from '@rateme/core/domain/entities/session.entity';

export interface RegisterUseCase {
  register(command: RegisterCommand): Promise<SessionEntity>;
}

export interface RegisterCommand {
  name: string;
  username: string;
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string | null;
}

export const RegisterUseCaseSymbol = Symbol('RegisterUseCase');
