import { Module } from '@nestjs/common';
import { EntityModule } from '@/core/modules';
import {
  CreateSessionUseCaseSymbol,
  RefreshSessionUseCaseSymbol,
  RemoveSessionUseCaseSymbol,
  SessionAbstractRepository,
  SessionService,
  TokenAbstractRepository,
} from '@/entities/session/domain';
import { SessionRepository, TokenRepository } from './repositories';
import { UserModule } from '@/entities/user/infrastructure';
import { SessionRepositoryEntity, TokenRepositoryEntity } from './entities';

@Module(
  EntityModule.config({
    imports: [UserModule],
    repositories: [
      {
        entity: SessionRepositoryEntity,
        abstract: SessionAbstractRepository,
        repository: SessionRepository,
      },
      {
        entity: TokenRepositoryEntity,
        abstract: TokenAbstractRepository,
        repository: TokenRepository,
      },
    ],
    useCases: (create) => [
      create({
        useCases: [
          CreateSessionUseCaseSymbol,
          RefreshSessionUseCaseSymbol,
          RemoveSessionUseCaseSymbol,
        ],
        inject: [SessionAbstractRepository, TokenAbstractRepository] as const,
        serviceFactory: (...inject) => new SessionService(...inject),
      }),
    ],
  }),
)
export class SessionModule {}
