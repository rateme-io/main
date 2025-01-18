import { JsonInterface } from '@rateme/core/domain/common/json.interface';
import { CollectionItemEntity } from '@rateme/core/domain/entities/collection-item.entity';
import { CollectionEntity } from '@rateme/core/domain/entities/collection.entity';
import { UserEntity } from '@rateme/core/domain/entities/user.entity';

export abstract class CollectionAbstractService {
  abstract createCollection(
    command: CreateCollectionCommand,
  ): Promise<CollectionEntity>;

  abstract createCollectionItem(
    command: CreateCollectionItemCommand,
  ): Promise<CollectionItemEntity>;

  abstract getCollections(
    command: GetCollectionsCommand,
  ): Promise<CollectionEntity[]>;

  abstract getCollectionItems(
    command: GetCollectionItemsCommand,
  ): Promise<CollectionItemEntity[]>;
}

export interface CreateCollectionCommand {
  user: UserEntity;
  jsonSchema: JsonInterface;
  name: string;
}

export interface CreateCollectionItemCommand {
  user: UserEntity;
  collectionId: string;
  name: string;
  jsonFields: JsonInterface;
}

export interface GetCollectionsCommand {
  user: UserEntity;
}

export interface GetCollectionItemsCommand {
  user: UserEntity;
  collectionId: string;
}
