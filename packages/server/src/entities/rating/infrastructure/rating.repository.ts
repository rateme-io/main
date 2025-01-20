import { RatingAbstractRepository } from '@/entities/rating/domain';
import { RatingEntity } from '@rateme/core/domain/entities/rating.entity';
import { RatingRepositoryEntity } from './rating.repository.entity';
import { EntityManager } from 'typeorm';
import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { JsonVo } from '@rateme/core/domain/value-objects/json.vo';

export class RatingRepository
  extends TypeormRepository<RatingEntity, RatingRepositoryEntity>
  implements RatingAbstractRepository
{
  constructor(entityManager: EntityManager) {
    super(entityManager, RatingRepositoryEntity);
  }

  async findAll(): Promise<RatingEntity[]> {
    const entities = await this.repository.find();

    return entities.map((entity) => this.toDomain(entity));
  }

  async create(entity: RatingEntity): Promise<RatingEntity> {
    const newEntity = await this.repository.save(this.toPersistence(entity));

    return this.toDomain(newEntity);
  }

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
