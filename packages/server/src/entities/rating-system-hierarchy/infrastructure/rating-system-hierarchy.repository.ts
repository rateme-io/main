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
      user: this.userRepository.toDomain(entity.user),
      parent: this.ratingSystemRepository.toDomain(entity.parent),
      child: this.ratingSystemRepository.toDomain(entity.child),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }

  toPersistence(
    entity: RatingSystemHierarchyEntity,
  ): RatingSystemHierarchyRepositoryEntity {
    return RatingSystemHierarchyRepositoryEntity.create({
      user: this.userRepository.toPersistence(entity.user),
      parent: this.ratingSystemRepository.toPersistence(entity.parent),
      child: this.ratingSystemRepository.toPersistence(entity.child),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }
}
