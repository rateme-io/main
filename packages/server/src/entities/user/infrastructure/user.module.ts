import { Module } from '@nestjs/common';
import { UserAbstractRepository } from '@/entities/user/domain';
import { EntityModule } from '@/core/modules';
import { UserRepositoryEntity } from './user.repository.entity';
import { UserRepository } from './user.repository';

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
