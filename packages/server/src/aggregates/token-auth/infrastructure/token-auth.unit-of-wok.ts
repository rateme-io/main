import {
  TokenAuthAbstractUnitOfWork,
  TokenAuthUnitOfWorkContext,
} from '@/aggregates/token-auth/domain';
import { Injectable } from '@nestjs/common';
import { DataSource, EntityManager } from 'typeorm';
import { PasswordRepository, TokenRepository } from './repositories';
import { UserRepository } from '@/entities/user/infrastructure';
import { SessionRepository } from '@/entities/session/infrastructure';
import { TypeormUnitOfWork } from '@/core/unit-of-work';

@Injectable()
export class TokenAuthUnitOfWork
  extends TypeormUnitOfWork<TokenAuthUnitOfWorkContext>
  implements TokenAuthAbstractUnitOfWork
{
  constructor(dataSource: DataSource) {
    super(dataSource);
  }

  createContext(entityManager: EntityManager): TokenAuthUnitOfWorkContext {
    const userRepository = new UserRepository(entityManager);
    const sessionRepository = new SessionRepository(
      entityManager,
      userRepository,
    );

    return {
      userRepository,
      passwordRepository: new PasswordRepository(entityManager, userRepository),
      sessionRepository,
      tokenRepository: new TokenRepository(entityManager, sessionRepository),
    };
  }
}
