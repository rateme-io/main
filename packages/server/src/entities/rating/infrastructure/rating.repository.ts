import { RatingAbstractRepository } from '@/entities/rating/domain';
import { RatingEntity } from '@rateme/core/domain/entities/rating.entity';
import { RatingRepositoryEntity } from './rating.repository.entity';
import { EntityManager } from 'typeorm';
import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { UserRepository } from '@/entities/user/infrastructure';
import { RatingSystemRepository } from '@/entities/rating-system/infrastructure';

export class RatingRepository
  extends TypeormRepository<RatingEntity, RatingRepositoryEntity>
  implements RatingAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly collectionRepository: CollectionRepository,
    private readonly userRepository: UserRepository,
    private readonly ratingSystemRepository: RatingSystemRepository,
  ) {
    super(entityManager, RatingRepositoryEntity);
  }

  // other methods

  toDomain(entity: RatingRepositoryEntity): RatingEntity {
    return RatingEntity.create({
      jsonRates: entity.jsonRates,
      collection: this.collectionRepository.toDomain(entity.collection),
      user: this.userRepository.toDomain(entity.user),
      ratingSystem: this.ratingSystemRepository.toDomain(entity.ratingSystem),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }

  toPersistence(entity: RatingEntity): RatingRepositoryEntity {
    return RatingRepositoryEntity.create({
      jsonRates: entity.jsonRates,
      collection: this.collectionRepository.toPersistence(entity.collection),
      user: this.userRepository.toPersistence(entity.user),
      ratingSystem: this.ratingSystemRepository.toPersistence(
        entity.ratingSystem,
      ),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }
}
