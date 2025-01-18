import { RatingSystemHierarchyAbstractRepository } from '@/entities/rating-system-hierarchy/domain';
import { RatingSystemHierarchyEntity } from '@rateme/core/domain/entities/rating-system-hierarchy.entity';
import { RatingSystemHierarchyRepositoryEntity } from './rating-system-hierarchy.repository.entity';
import { EntityManager } from 'typeorm';
import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { UserRepository } from '@/entities/user/infrastructure';
import { RatingSystemRepository } from '@/entities/rating-system/infrastructure';

export class RatingSystemHierarchyRepository
  extends TypeormRepository<
    RatingSystemHierarchyEntity,
    RatingSystemHierarchyRepositoryEntity
  >
  implements RatingSystemHierarchyAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly ratingSystemRepository: RatingSystemRepository,
  ) {
    super(entityManager, RatingSystemHierarchyRepositoryEntity);
  }

  // other methods

  toDomain(
    entity: RatingSystemHierarchyRepositoryEntity,
  ): RatingSystemHierarchyEntity {
    return RatingSystemHierarchyEntity.create({
      userId: entity.userId,
      parentId: entity.parentId,
      childId: entity.childId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }

  toPersistence(
    entity: RatingSystemHierarchyEntity,
  ): RatingSystemHierarchyRepositoryEntity {
    return RatingSystemHierarchyRepositoryEntity.create({
      userId: entity.userId,
      parentId: entity.parentId,
      childId: entity.childId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }
}
