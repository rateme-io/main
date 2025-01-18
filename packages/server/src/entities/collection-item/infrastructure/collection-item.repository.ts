import { TypeormRepository } from '@/core/repository/typeorm.repository';
import { CollectionItemRepositoryEntity } from './collection-item.repository.entity';
import { CollectionItemEntity } from '@rateme/core/domain/entities/collection-item.entity';
import { CollectionItemAbstractRepository } from '@/entities/collection-item/domain';
import { EntityManager } from 'typeorm';
import { UserRepository } from '@/entities/user/infrastructure';
import { CollectionRepository } from '@/entities/collection/infrastructure';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';

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
      relations: ['collection', 'user'],
    });

    console.log(collectionItems);

    return collectionItems.map((collectionItem) =>
      this.toDomain(collectionItem),
    );
  }

  toDomain(entity: CollectionItemRepositoryEntity): CollectionItemEntity {
    return CollectionItemEntity.create({
      collection:
        entity.collection &&
        this.collectionRepository.toDomain(entity.collection),
      collectionId: entity.collectionId,
      user: entity.user && this.userRepository.toDomain(entity.user),
      userId: entity.userId,
      name: new NameVo(entity.name),
      createdAt: entity.createdAt,
      id: entity.id,
      updatedAt: entity.updatedAt,
      jsonFields: entity.jsonFields,
    });
  }

  toPersistence(entity: CollectionItemEntity): CollectionItemRepositoryEntity {
    return CollectionItemRepositoryEntity.create({
      collection:
        entity.collection &&
        this.collectionRepository.toPersistence(entity.collection),
      user: entity.user && this.userRepository.toPersistence(entity.user),
      collectionId: entity.collectionId,
      userId: entity.userId,
      name: entity.name.getValue(),
      createdAt: entity.createdAt,
      id: entity.id,
      updatedAt: entity.updatedAt,
      jsonFields: entity.jsonFields,
    });
  }
}
