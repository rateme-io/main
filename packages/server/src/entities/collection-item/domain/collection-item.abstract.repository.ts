import { CollectionItemEntity } from '@rateme/core/domain/entities/collection-item.entity';

import { Repository } from '@/core/repository';

export abstract class CollectionItemAbstractRepository extends Repository<CollectionItemEntity> {
  abstract create(entity: CollectionItemEntity): Promise<CollectionItemEntity>;

  abstract findByCollectionId(
    collectionId: string,
  ): Promise<CollectionItemEntity[]>;
}
