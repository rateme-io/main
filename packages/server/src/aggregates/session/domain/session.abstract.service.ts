import { Request } from 'express';
import { SessionEntity } from '@rateme/core/domain/entities/session.entity';

export abstract class SessionAbstractService {
  abstract getSession(request: Request): Promise<SessionEntity>;
}

