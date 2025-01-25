import { Inject, Injectable } from '@nestjs/common';

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
}
