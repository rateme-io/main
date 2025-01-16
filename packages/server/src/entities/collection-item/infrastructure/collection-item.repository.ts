import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { CollectionItemRepositoryEntity } from './collection-item.repository.entity';
import { CollectionItemEntity } from '@rateme/core/domain/entities/collection-item.entity';
import { CollectionItemAbstractRepository } from '@/entities/collection-item/domain';
import { EntityManager } from 'typeorm';
import { UserRepository } from '@/entities/user/infrastructure';
import { CollectionRepository } from '@/entities/collection/infrastructure';

export class CollectionItemRepository
  extends TypeormRepository<
    CollectionItemEntity,
    CollectionItemRepositoryEntity
  >
  implements CollectionItemAbstractRepository
{
  constructor(
    entityManager: EntityManager,
    private readonly collectionRepository: CollectionRepository,
    private readonly userRepository: UserRepository,
  ) {
    super(entityManager, CollectionItemRepositoryEntity);
  }

  toDomain(entity: CollectionItemRepositoryEntity): CollectionItemEntity {
    return CollectionItemEntity.create({
      collection: this.collectionRepository.toDomain(entity.collection),
      user: this.userRepository.toDomain(entity.user),
      name: entity.name,
      createdAt: entity.createdAt,
      id: entity.id,
      updatedAt: entity.updatedAt,
      jsonFields: entity.jsonFields,
    });
  }

  toPersistence(entity: CollectionItemEntity): CollectionItemRepositoryEntity {
    return CollectionItemRepositoryEntity.create({
      collection: this.collectionRepository.toPersistence(entity.collection),
      user: this.userRepository.toPersistence(entity.user),
      name: entity.name,
      createdAt: entity.createdAt,
      id: entity.id,
      updatedAt: entity.updatedAt,
      jsonFields: entity.jsonFields,
    });
  }
}
