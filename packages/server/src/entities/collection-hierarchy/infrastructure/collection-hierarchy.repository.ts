import { EntityManager } from 'typeorm';

import { CollectionHierarchyEntity } from '@rateme/core/domain/entities/collection-hierarchy.entity';

import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { CollectionHierarchyAbstractRepository } from '@/entities/collection-hierarchy/domain';
import { UserRepository } from '@/entities/user/infrastructure';

import { CollectionHierarchyRepositoryEntity } from './collection-hierarchy.repository.entity';

export class CollectionHierarchyRepository
  extends TypeormRepository<
    CollectionHierarchyEntity,
    CollectionHierarchyRepositoryEntity
  >
  implements CollectionHierarchyAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly collectionRepository: CollectionRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(entityManager, CollectionHierarchyRepositoryEntity);
  }

  toDomain(
    entity: CollectionHierarchyRepositoryEntity,
  ): CollectionHierarchyEntity {
    return CollectionHierarchyEntity.create({
      parentId: entity.parentId,
      childId: entity.childId,
      userId: entity.userId,
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  toPersistence(
    entity: CollectionHierarchyEntity,
  ): CollectionHierarchyRepositoryEntity {
    return CollectionHierarchyRepositoryEntity.create({
      parentId: entity.parentId,
      childId: entity.childId,
      userId: entity.userId,
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }
}
