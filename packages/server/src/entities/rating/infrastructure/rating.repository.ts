import { RatingAbstractRepository } from '@/entities/rating/domain';
import { RatingEntity } from '@rateme/core/domain/entities/rating.entity';
import { RatingRepositoryEntity } from './rating.repository.entity';
import { EntityManager } from 'typeorm';
import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { UserRepository } from '@/entities/user/infrastructure';
import { RatingSystemRepository } from '@/entities/rating-system/infrastructure';
import { JsonVo } from '@rateme/core/domain/value-objects/json.vo';

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
      jsonRates: new JsonVo(entity.jsonRates),
      collectionId: entity.collectionId,
      userId: entity.userId,
      ratingSystemId: entity.ratingSystemId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }

  toPersistence(entity: RatingEntity): RatingRepositoryEntity {
    return RatingRepositoryEntity.create({
      jsonRates: entity.jsonRates.getValue(),
      collectionId: entity.collectionId,
      userId: entity.userId,
      ratingSystemId: entity.ratingSystemId,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }
}
