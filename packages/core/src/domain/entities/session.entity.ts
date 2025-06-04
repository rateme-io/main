import { z } from 'zod';

import {
  addBaseFields,
  BaseEntity,
  CreateEntityCommand,
} from '@/domain/common/base.entity';
import { ZodValidator } from '@/domain/common/zod-validator';

import { UserEntity } from './user.entity';

export enum SessionStatus {
  active = 'active',
  inactive = 'inactive',
}

export class SessionEntity extends BaseEntity {
  @ZodValidator(z.string())
  sessionId: string;

  user: UserEntity;

  @ZodValidator(z.nativeEnum(SessionStatus))
  status: SessionStatus;

  @ZodValidator(z.string().ip())
  ipAddress: string;

  @ZodValidator(z.string().optional())
  userAgent: string | null;

  static create(command: CreateEntityCommand<SessionEntity>) {
    const session = new SessionEntity();

    session.sessionId = command.sessionId;
    session.user = command.user;
    session.status = command.status;
    session.ipAddress = command.ipAddress;
    session.userAgent = command.userAgent;

    addBaseFields(session, command);

    return session;
  }
}

export class TokenEntity extends BaseEntity {
  @ZodValidator(z.string())
  accessToken: string;

  @ZodValidator(z.string())
  refreshToken: string;

  @ZodValidator(z.date())
  accessTokenExpiresAt: Date;

  @ZodValidator(z.date())
  refreshTokenExpiresAt: Date;

  session: SessionEntity;

  static create(command: CreateEntityCommand<TokenEntity>) {
    const token = new TokenEntity();

    token.accessToken = command.accessToken;
    token.refreshToken = command.refreshToken;
    token.accessTokenExpiresAt = command.accessTokenExpiresAt;
    token.refreshTokenExpiresAt = command.refreshTokenExpiresAt;
    token.session = command.session;

    addBaseFields(token, command);

    return token;
  }
}
