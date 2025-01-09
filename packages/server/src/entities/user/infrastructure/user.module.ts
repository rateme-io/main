import { Module } from '@nestjs/common';
import { UserAbstractRepository } from '@/entities/user/domain';
import { UserRepository } from './user.repository';
import { UserRepositoryEntity } from './user.repository.entity';
import { EntityModule } from '@/core/modules';

@Module(
  EntityModule.config({
    repositories: [
      {
        entity: UserRepositoryEntity,
        abstract: UserAbstractRepository,
        repository: UserRepository,
      },
    ],
  }),
)
export class UserModule {}
