import { CollectionAbstractRepository } from '@/entities/collection/domain';
import { CollectionEntity } from '@rateme/core/domain/entities/collection.entity';
import { CollectionRepositoryEntity } from './collection.repository.entity';
import { EntityManager } from 'typeorm';
import { UserRepository } from '@/entities/user/infrastructure';
import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { undefined } from 'zod';

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

  async create(entity: CollectionEntity): Promise<CollectionEntity | null> {
    const collection = this.toPersistence(entity);

    const newCollection = await this.repository.save(collection);

    return this.toDomain(newCollection);
  }

  async findById(id: string): Promise<CollectionEntity | null> {
    const collection = await this.repository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!collection) {
      return null;
    }

    return this.toDomain(collection);
  }

  async findAll(): Promise<CollectionEntity[]> {
    const collections = await this.repository.find({
      relations: ['user'],
    });

    return collections.map((collection) => this.toDomain(collection));
  }

  toDomain(entity: CollectionRepositoryEntity): CollectionEntity {
    return CollectionEntity.create({
      name: new NameVo(entity.name),
      user: entity.user && this.userRepository.toDomain(entity.user),
      userId: entity.userId,
      version: entity.version,
      jsonSchema: entity.jsonSchema,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }

  toPersistence(entity: CollectionEntity): CollectionRepositoryEntity {
    return CollectionRepositoryEntity.create({
      name: entity.name.getValue(),
      user: entity.user && this.userRepository.toPersistence(entity.user),
      userId: entity.userId,
      version: entity.version,
      jsonSchema: entity.jsonSchema,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }
}
