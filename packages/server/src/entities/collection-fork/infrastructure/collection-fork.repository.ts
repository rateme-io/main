import { EntityManager } from 'typeorm';

import { CollectionForkEntity } from '@rateme/core/domain/entities/collection-fork.entity';

import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { CollectionForkAbstractRepository } from '@/entities/collection-fork/domain';
import { UserRepository } from '@/entities/user/infrastructure';

import { CollectionForkRepositoryEntity } from './collection-fork.repository.entity';

export class CollectionForkRepository
  extends TypeormRepository<
    CollectionForkEntity,
    CollectionForkRepositoryEntity
  >
  implements CollectionForkAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly collectionRepository: CollectionRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(entityManager, CollectionForkRepositoryEntity);
  }

  toDomain(entity: CollectionForkRepositoryEntity): CollectionForkEntity {
    return CollectionForkEntity.create({
      forkedId: entity.forkedId,
      originalId: entity.originalId,
      userId: entity.userId,
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  toPersistence(entity: CollectionForkEntity): CollectionForkRepositoryEntity {
    return CollectionForkRepositoryEntity.create({
      forkedId: entity.forkedId,
      originalId: entity.originalId,
      userId: entity.userId,
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }
}
