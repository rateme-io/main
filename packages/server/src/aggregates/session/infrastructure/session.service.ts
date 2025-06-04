import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { Request } from 'express';

import { SessionStatus } from '@rateme/core/domain/entities/session.entity';
import { CookieService } from '@/core/modules/cookie';

import { SessionAbstractService } from '../domain';
import { SessionUnitOfWork } from './session.unit-of-work';

@Injectable()
export class SessionService extends SessionAbstractService {
  constructor(
    @Inject(SessionUnitOfWork)
    private readonly sessionUnitOfWork: SessionUnitOfWork,
    @Inject(CookieService)
    private readonly cookieService: CookieService,
  ) {
    super();
  }

  async getSession(request: Request) {
    const sessionId = this.cookieService.getSessionId(request);

    if (!sessionId) {
      throw new UnauthorizedException();
    }

    return this.sessionUnitOfWork.start(async ({ sessionRepository }) => {
      const session = await sessionRepository.findById(sessionId);

      if (!session || session.status === SessionStatus.inactive) {
        throw new UnauthorizedException();
      }

      return session;
    });
  }
}
