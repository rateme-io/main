import {
  SessionEntity,
  TokenEntity,
} from '@rateme/core/domain/entities/session.entity';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';

export abstract class TokenAuthAbstractService {
  abstract login(command: TokenLoginCommand): Promise<SessionResponse>;

  abstract refresh(command: RefreshCommand): Promise<SessionResponse>;

  abstract register(command: RegisterCommand): Promise<SessionResponse>;

  abstract createSession(command: CreateSessionCommand): Promise<TokenEntity>;

  abstract createToken(command: CreateTokenCommand): Promise<TokenEntity>;

  abstract checkSession(command: CheckSessionCommand): Promise<boolean>;
}

export interface TokenLoginCommand {
  email: string;
  password: string;
  ipAddress: string;
  userAgent: string | null;
}

export interface RefreshCommand {
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

export interface CheckSessionCommand {
  accessToken: string;
}

export interface SessionResponse {
  token: TokenEntity;
}
