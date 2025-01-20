import { EntityManager } from 'typeorm';

import { CollectionEntity } from '@rateme/core/domain/entities/collection.entity';
import { JsonVo } from '@rateme/core/domain/value-objects/json.vo';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';

import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { CollectionAbstractRepository } from '@/entities/collection/domain';
import { UserRepository } from '@/entities/user/infrastructure';

import { CollectionRepositoryEntity } from './collection.repository.entity';

export class CollectionRepository
  extends TypeormRepository<CollectionEntity, CollectionRepositoryEntity>
  implements CollectionAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly userRepository: UserRepository,
  ) {
    super(entityManager, CollectionRepositoryEntity);
  }

  async create(entity: CollectionEntity): Promise<CollectionEntity> {
    const collection = this.toPersistence(entity);

    const newCollection = await this.repository.save(collection);

    return this.toDomain(newCollection);
  }

  async findById(id: string): Promise<CollectionEntity | null> {
    const collection = await this.repository.findOne({
      where: { id },
    });

    if (!collection) {
      return null;
    }

    return this.toDomain(collection);
  }

  async findAll(): Promise<CollectionEntity[]> {
    const collections = await this.repository.find();

    return collections.map((collection) => this.toDomain(collection));
  }

  toDomain(entity: CollectionRepositoryEntity): CollectionEntity {
    return CollectionEntity.create({
      name: new NameVo(entity.name),
      userId: entity.userId,
      version: entity.version,
      jsonSchema: new JsonVo(entity.jsonSchema),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }

  toPersistence(entity: CollectionEntity): CollectionRepositoryEntity {
    return CollectionRepositoryEntity.create({
      name: entity.name.getValue(),
      userId: entity.userId,
      version: entity.version,
      jsonSchema: entity.jsonSchema.getValue(),
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }
}
