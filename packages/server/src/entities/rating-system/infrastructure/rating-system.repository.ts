import { EntityManager } from 'typeorm';

import { RatingSystemEntity } from '@rateme/core/domain/entities/rating-system.entity';
import { JsonVo } from '@rateme/core/domain/value-objects/json.vo';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';

import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { RatingSystemAbstractRepository } from '@/entities/rating-system/domain';

import { RatingSystemRepositoryEntity } from './rating-system.repository.entity';

export class RatingSystemRepository
  extends TypeormRepository<RatingSystemEntity, RatingSystemRepositoryEntity>
  implements RatingSystemAbstractRepository
{
  constructor(entityManager: EntityManager) {
    super(entityManager, RatingSystemRepositoryEntity);
  }

  async findAll(): Promise<RatingSystemEntity[]> {
    const entities = await this.repository.find();

    return entities.map((entity) => this.toDomain(entity));
  }

  async findById(id: string): Promise<RatingSystemEntity | null> {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      return null;
    }

    return this.toDomain(entity);
  }

  async create(entity: RatingSystemEntity): Promise<RatingSystemEntity> {
    const newEntity = await this.repository.save(this.toPersistence(entity));

    return this.toDomain(newEntity);
  }

  toDomain(entity: RatingSystemRepositoryEntity): RatingSystemEntity {
    return RatingSystemEntity.create({
      name: new NameVo(entity.name),
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
      name: entity.name.getValue(),
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
