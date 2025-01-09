import { SessionEntity } from '@rateme/core/domain/entities/session.entity';

export interface LoginUseCase {
  login(command: LoginCommand): Promise<SessionEntity>;
}

export interface LoginCommand {
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string | null;
}

export const LoginUseCaseSymbol = Symbol('LoginUseCase');
