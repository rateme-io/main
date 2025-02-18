import { EntityManager } from 'typeorm';

import { CollectionItemEntity } from '@rateme/core/domain/entities/collection-item.entity';
import { JsonVo } from '@rateme/core/domain/value-objects/json.vo';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';

import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { CollectionItemAbstractRepository } from '@/entities/collection-item/domain';
import { UserRepository } from '@/entities/user/infrastructure';

import { CollectionItemRepositoryEntity } from './collection-item.repository.entity';

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

  async create(entity: CollectionItemEntity): Promise<CollectionItemEntity> {
    const collectionItem = this.toPersistence(entity);

    const newCollectionItem = await this.repository.save(collectionItem);

    return this.toDomain(newCollectionItem);
  }

  async findByCollectionId(
    collectionId: string,
  ): Promise<CollectionItemEntity[]> {
    const collectionItems = await this.repository.find({
      where: { collection: { id: collectionId } },
    });

    return collectionItems.map((collectionItem) =>
      this.toDomain(collectionItem),
    );
  }

  toDomain(entity: CollectionItemRepositoryEntity): CollectionItemEntity {
    return CollectionItemEntity.create({
      collectionId: entity.collectionId,
      userId: entity.userId,
      name: new NameVo(entity.name),
      createdAt: entity.createdAt,
      id: entity.id,
      updatedAt: entity.updatedAt,
      jsonFields: new JsonVo(entity.jsonFields),
    });
  }

  toPersistence(entity: CollectionItemEntity): CollectionItemRepositoryEntity {
    return CollectionItemRepositoryEntity.create({
      collectionId: entity.collectionId,
      userId: entity.userId,
      name: entity.name.getValue(),
      createdAt: entity.createdAt,
      id: entity.id,
      updatedAt: entity.updatedAt,
      jsonFields: entity.jsonFields.getValue(),
    });
  }
}
