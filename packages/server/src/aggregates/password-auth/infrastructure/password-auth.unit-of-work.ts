import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';

import { PasswordAbstractRepository } from '@/aggregates/password-auth/domain';
import { TypeormUnitOfWork } from '@/core/unit-of-work';
import { SessionAbstractRepository } from '@/entities/session/domain';
import { SessionRepository } from '@/entities/session/infrastructure';
import { UserAbstractRepository } from '@/entities/user/domain';
import { UserRepository } from '@/entities/user/infrastructure';

import { PasswordRepository } from './repositories';

export interface PasswordAuthUnitOfWorkContext {
  userRepository: UserAbstractRepository;
  passwordRepository: PasswordAbstractRepository;
  sessionRepository: SessionAbstractRepository;
}

@Injectable()
export class PasswordAuthUnitOfWork extends TypeormUnitOfWork<PasswordAuthUnitOfWorkContext> {
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  createContext(entityManager: EntityManager): PasswordAuthUnitOfWorkContext {
    const userRepository = new UserRepository(entityManager);
    const sessionRepository = new SessionRepository(
      entityManager,
      userRepository,
    );

    return {
      userRepository,
      passwordRepository: new PasswordRepository(entityManager, userRepository),
      sessionRepository,
    };
  }
}
