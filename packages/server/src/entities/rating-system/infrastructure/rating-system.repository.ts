import { RatingSystemAbstractRepository } from '@/entities/rating-system/domain';
import { RatingSystemEntity } from '@rateme/core/domain/entities/rating-system.entity';
import { RatingSystemRepositoryEntity } from './rating-system.repository.entity';
import { EntityManager } from 'typeorm';
import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { UserRepository } from '@/entities/user/infrastructure';

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
      user: this.userRepository.toDomain(entity.user),
      version: entity.version,
      jsonFormula: entity.jsonFormula,
      jsonSchema: entity.jsonSchema,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
      id: entity.id,
    });
  }

  toPersistence(entity: RatingSystemEntity): RatingSystemRepositoryEntity {
    return RatingSystemRepositoryEntity.create({
      user: this.userRepository.toPersistence(entity.user),
      version: entity.version,
      jsonFormula: entity.jsonFormula,
      jsonSchema: entity.jsonSchema,
      updatedAt: entity.updatedAt,
      createdAt: entity.createdAt,
      id: entity.id,
    });
  }
}
