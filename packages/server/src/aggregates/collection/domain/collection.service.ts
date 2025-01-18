import { CollectionEntity } from '@rateme/core/domain/entities/collection.entity';
import {
  CollectionAbstractService,
  CreateCollectionCommand,
  CreateCollectionItemCommand,
  GetCollectionItemsCommand,
} from './collection.abstract.service';
import { CollectionAbstractUnitOfWork } from './collection.abstract.unit-of-work';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { JsonSchemaService } from '@/core/modules/json-schema';
import { CollectionItemEntity } from '@rateme/core/domain/entities/collection-item.entity';

export class CollectionService extends CollectionAbstractService {
  constructor(
    private readonly collectionUnitOfWork: CollectionAbstractUnitOfWork,
    private readonly jsonSchemaService: JsonSchemaService,
  ) {
    super();
  }

  getCollections(): Promise<CollectionEntity[]> {
    return this.collectionUnitOfWork.start(async ({ collectionRepository }) => {
      return await collectionRepository.findAll();
    });
  }

  createCollection(
    command: CreateCollectionCommand,
  ): Promise<CollectionEntity> {
    return this.collectionUnitOfWork.start(async ({ collectionRepository }) => {
      const isValid = this.jsonSchemaService.validateSchema(command.jsonSchema);

      if (!isValid) {
        throw new Error('Invalid JSON schema');
      }

      const entity = CollectionEntity.create({
        userId: command.user.id,
        name: new NameVo(command.name),
        jsonSchema: command.jsonSchema,
        version: 1,
      });

      const newCollection = await collectionRepository.create(entity);

      if (!newCollection) {
        throw new Error('Failed to create collection');
      }

      return newCollection;
    });
  }

  getCollectionItems(
    command: GetCollectionItemsCommand,
  ): Promise<CollectionItemEntity[]> {
    return this.collectionUnitOfWork.start(
      async ({ collectionItemRepository }) => {
        return await collectionItemRepository.findByCollectionId(
          command.collectionId,
        );
      },
    );
  }

  async createCollectionItem(
    command: CreateCollectionItemCommand,
  ): Promise<CollectionItemEntity> {
    return this.collectionUnitOfWork.start(
      async ({ collectionRepository, collectionItemRepository }) => {
        const collection = await collectionRepository.findById(
          command.collectionId,
        );

        if (!collection) {
          throw new Error('Collection not found');
        }

        const isValid = this.jsonSchemaService.validateData(
          collection.jsonSchema,
          command.jsonFields,
        );

        if (!isValid) {
          throw new Error('Invalid JSON data');
        }

        const entity = CollectionItemEntity.create({
          collectionId: command.collectionId,
          userId: command.user.id,
          jsonFields: command.jsonFields,
          name: new NameVo(command.name),
        });

        await entity.validate();

        return await collectionItemRepository.create(entity);
      },
    );
  }
}
