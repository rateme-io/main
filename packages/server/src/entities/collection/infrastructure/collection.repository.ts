import { CollectionAbstractRepository } from '@/entities/collection/domain';
import { CollectionEntity } from '@rateme/core/domain/entities/collection.entity';
import { CollectionRepositoryEntity } from './collection.repository.entity';
import { EntityManager } from 'typeorm';
import { UserRepository } from '@/entities/user/infrastructure';
import { TypeormRepository } from '@/core/repository/typeorm.repository';

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

  toDomain(entity: CollectionRepositoryEntity): CollectionEntity {
    return CollectionEntity.create({
      name: entity.name,
      user: this.userRepository.toDomain(entity.user),
      version: entity.version,
      jsonSchema: entity.jsonSchema,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }

  toPersistence(entity: CollectionEntity): CollectionRepositoryEntity {
    return CollectionRepositoryEntity.create({
      name: entity.name,
      user: this.userRepository.toPersistence(entity.user),
      version: entity.version,
      jsonSchema: entity.jsonSchema,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      id: entity.id,
    });
  }
}
