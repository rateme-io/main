import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

import { SessionStatus } from '@rateme/core/domain/entities/session.entity';

import { SessionAbstractService } from '../domain';
import { SessionUnitOfWork } from './session.unit-of-work';

@Injectable()
export class SessionService extends SessionAbstractService {
  constructor(
    @Inject(SessionUnitOfWork)
    private readonly sessionUnitOfWork: SessionUnitOfWork,
  ) {
    super();
  }

  async getSession(sessionId: string) {
    return this.sessionUnitOfWork.start(async ({ sessionRepository }) => {
      const session = await sessionRepository.findById(sessionId);

      if (!session || session.status === SessionStatus.inactive) {
        throw new UnauthorizedException();
      }

      return session;
    });
  }
}
