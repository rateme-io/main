import { TokenEntity } from '@rateme/core/domain/entities/session.entity';

export abstract class PasswordAuthAbstractService {
  abstract login(command: TokenLoginCommand): Promise<TokenSessionResponse>;

  abstract refresh(command: RefreshCommand): Promise<TokenSessionResponse>;

  abstract register(command: RegisterCommand): Promise<TokenSessionResponse>;

  abstract logout(command: LogoutCommand): Promise<void>;

  abstract checkSession(command: CheckSessionCommand): Promise<void>;
}

export interface TokenLoginCommand {
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string | null;
}

export interface RefreshCommand {
  sessionId: string;
  refreshToken: string;
}

export interface RegisterCommand {
  name: string;
  username: string;
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string | null;
}

export interface LogoutCommand {
  sessionId: string;
}

export interface CheckSessionCommand {
  sessionId: string;
  accessToken: string;
}

export interface TokenSessionResponse {
  token: TokenEntity;
  accessToken: string;
  refreshToken: string;
}
