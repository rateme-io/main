import { EntityManager } from 'typeorm';
import { UserRepository } from '@/entities/user/infrastructure';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { CollectionHierarchyAbstractRepository } from '@/entities/collection-hierarchy/domain';
import { CollectionHierarchyRepositoryEntity } from './collection-hierarchy.repository.entity';
import { CollectionHierarchyEntity } from '@rateme/core/domain/entities/collection-hierarchy.entity';
import { TypeormRepository } from '@/core/repository/typeorm.repository';

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
      parent: this.collectionRepository.toDomain(entity.parent),
      child: this.collectionRepository.toDomain(entity.child),
      user: this.userRepository.toDomain(entity.user),
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }

  toPersistence(
    entity: CollectionHierarchyEntity,
  ): CollectionHierarchyRepositoryEntity {
    return CollectionHierarchyRepositoryEntity.create({
      parent: this.collectionRepository.toPersistence(entity.parent),
      child: this.collectionRepository.toPersistence(entity.child),
      user: this.userRepository.toPersistence(entity.user),
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }
}
