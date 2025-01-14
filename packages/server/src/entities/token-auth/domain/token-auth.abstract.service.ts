import {
  SessionEntity,
  TokenEntity,
} from '@rateme/core/domain/entities/session.entity';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';

export abstract class TokenAuthAbstractService {
  abstract login(command: TokenLoginCommand): Promise<TokenSessionResponse>;

  abstract refresh(command: RefreshCommand): Promise<TokenSessionResponse>;

  abstract register(command: RegisterCommand): Promise<TokenSessionResponse>;

  abstract createSession(
    command: CreateSessionCommand,
  ): Promise<TokenSessionResponse>;

  abstract createToken(
    command: CreateTokenCommand,
  ): Promise<TokenSessionResponse>;

  abstract checkSession(command: CheckSessionCommand): Promise<boolean>;
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
  sessionId: string;
  accessToken: string;
}

export interface TokenSessionResponse {
  token: TokenEntity;
  accessToken: string;
  refreshToken: string;
}
