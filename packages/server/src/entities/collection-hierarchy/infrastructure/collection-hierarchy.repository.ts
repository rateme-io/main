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
      parent:
        entity.parent && this.collectionRepository.toDomain(entity.parent),
      parentId: entity.parentId,
      child: entity.child && this.collectionRepository.toDomain(entity.child),
      childId: entity.childId,
      user: entity.user && this.userRepository.toDomain(entity.user),
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
      parent:
        entity.parent && this.collectionRepository.toPersistence(entity.parent),
      parentId: entity.parentId,
      child:
        entity.child && this.collectionRepository.toPersistence(entity.child),
      childId: entity.childId,
      user: entity.user && this.userRepository.toPersistence(entity.user),
      userId: entity.userId,
      id: entity.id,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
    });
  }
}
