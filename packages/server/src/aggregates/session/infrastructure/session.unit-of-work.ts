import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { TypeormUnitOfWork } from '@/core/unit-of-work';
import { SessionAbstractRepository } from '@/entities/session/domain';
import { SessionRepository } from '@/entities/session/infrastructure';
import { TokenAbstractRepository } from '../domain';
import { TokenRepository } from './repositories';
import { UserAbstractRepository } from '@/entities/user/domain';
import { UserRepository } from '@/entities/user/infrastructure';

export interface SessionUnitOfWorkContext {
  sessionRepository: SessionAbstractRepository;
  userRepository: UserAbstractRepository;
  tokenRepository: TokenAbstractRepository;
}

@Injectable()
export class SessionUnitOfWork extends TypeormUnitOfWork<SessionUnitOfWorkContext> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  createContext(entityManager: EntityManager): SessionUnitOfWorkContext {
    const userRepository = new UserRepository(entityManager);
    const sessionRepository = new SessionRepository(
      entityManager,
      userRepository,
    );
    const tokenRepository = new TokenRepository(entityManager, sessionRepository);

    return {
      sessionRepository,
      userRepository,
      tokenRepository,
    };
  }
}
