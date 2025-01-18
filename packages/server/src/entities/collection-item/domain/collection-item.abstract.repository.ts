import { Repository } from '@/core/repository';
import { CollectionItemEntity } from '@rateme/core/domain/entities/collection-item.entity';

export abstract class CollectionItemAbstractRepository extends Repository<CollectionItemEntity> {
  abstract create(entity: CollectionItemEntity): Promise<CollectionItemEntity>;

  abstract findByCollectionId(
    collectionId: string,
  ): Promise<CollectionItemEntity[]>;
}
