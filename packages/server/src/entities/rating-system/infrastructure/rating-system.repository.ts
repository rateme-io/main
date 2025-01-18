import { RatingSystemAbstractRepository } from '@/entities/rating-system/domain';
import { RatingSystemEntity } from '@rateme/core/domain/entities/rating-system.entity';
import { RatingSystemRepositoryEntity } from './rating-system.repository.entity';
import { EntityManager } from 'typeorm';
import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { UserRepository } from '@/entities/user/infrastructure';
import { JsonVo } from '@rateme/core/domain/value-objects/json.vo';

export class RatingSystemRepository
  extends TypeormRepository<RatingSystemEntity, RatingSystemRepositoryEntity>
  implements RatingSystemAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly userRepository: UserRepository,
  ) {
    super(entityManager, RatingSystemRepositoryEntity);
  }

  // other methods

  toDomain(entity: RatingSystemRepositoryEntity): RatingSystemEntity {
    return RatingSystemEntity.create({
      userId: entity.userId,
      version: entity.version,
      jsonFormula: new JsonVo(entity.jsonFormula),
      jsonSchema: new JsonVo(entity.jsonSchema),
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
      id: entity.id,
    });
  }

  toPersistence(entity: RatingSystemEntity): RatingSystemRepositoryEntity {
    return RatingSystemRepositoryEntity.create({
      userId: entity.userId,
      version: entity.version,
      jsonFormula: entity.jsonFormula.getValue(),
      jsonSchema: entity.jsonSchema.getValue(),
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
      id: entity.id,
    });
  }
}
