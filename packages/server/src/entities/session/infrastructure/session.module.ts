import { Module } from '@nestjs/common';
import { EntityModule } from '@/core/modules';
import { SessionAbstractRepository } from '@/entities/session/domain';
import { UserModule } from '@/entities/user/infrastructure';
import { SessionRepositoryEntity } from './session.repository.entity';
import { SessionRepository } from './session.repository';

@Module(
  EntityModule.config({
    imports: [UserModule],
    repositories: [
      {
        entity: SessionRepositoryEntity,
        abstract: SessionAbstractRepository,
        repository: SessionRepository,
      },
    ],
  }),
)
export class SessionModule {}
