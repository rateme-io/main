import { RatingSystemForkAbstractRepository } from '@/entities/rating-system-fork/domain';
import { RatingSystemForkEntity } from '@rateme/core/domain/entities/rating-system-fork.entity';
import { RatingSystemForkRepositoryEntity } from './rating-system-fork.repository.entity';
import { EntityManager } from 'typeorm';
import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { RatingSystemRepository } from '@/entities/rating-system/infrastructure';
import { UserRepository } from '@/entities/user/infrastructure';

export class RatingSystemForkRepository
  extends TypeormRepository<
    RatingSystemForkEntity,
    RatingSystemForkRepositoryEntity
  >
  implements RatingSystemForkAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly userRepository: UserRepository,
    private readonly ratingSystemRepository: RatingSystemRepository,
  ) {
    super(entityManager, RatingSystemForkRepositoryEntity);
  }

  // other methods

  toDomain(entity: RatingSystemForkRepositoryEntity): RatingSystemForkEntity {
    return RatingSystemForkEntity.create({
      userId: entity.userId,
      forkedId: entity.forkedId,
      originalId: entity.originalId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }

  toPersistence(
    entity: RatingSystemForkEntity,
  ): RatingSystemForkRepositoryEntity {
    return RatingSystemForkRepositoryEntity.create({
      userId: entity.userId,
      forkedId: entity.forkedId,
      originalId: entity.originalId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }
}
