import {
  TokenAuthAbstractUnitOfWork,
  TokenAuthUnitOfWorkContext,
} from '@/entities/token-auth/domain';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { PasswordRepository, TokenRepository } from './repositories';
import { UserRepository } from '@/entities/user/infrastructure';
import { SessionRepository } from '@/entities/session/infrastructure';

@Injectable()
export class TokenAuthUnitOfWork implements TokenAuthAbstractUnitOfWork {
  constructor(private readonly dataSource: DataSource) {}

  async start<T>(
    callback: (context: TokenAuthUnitOfWorkContext) => Promise<T>,
  ): Promise<T> {
    return this.dataSource.manager.transaction(async (entityManager) => {
      const userRepository = new UserRepository(entityManager);
      const sessionRepository = new SessionRepository(
        entityManager,
        userRepository,
      );

      const context: TokenAuthUnitOfWorkContext = {
        userRepository,
        passwordRepository: new PasswordRepository(
          entityManager,
          userRepository,
        ),
        sessionRepository,
        tokenRepository: new TokenRepository(entityManager, sessionRepository),
      };

      return callback(context);
    });
  }
}
