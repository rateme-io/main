import { CollectionEntity } from '@rateme/core/domain/entities/collection.entity';
import {
  CollectionAbstractService,
  CreateCollectionCommand,
  CreateCollectionItemCommand,
  GetCollectionItemsCommand,
} from '../domain';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { JsonSchemaService } from '@/core/modules/json-schema';
import { CollectionItemEntity } from '@rateme/core/domain/entities/collection-item.entity';
import { JsonVo } from '@rateme/core/domain/value-objects/json.vo';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CollectionUnitOfWork } from './collection.unit-of-work';

@Injectable()
export class CollectionService extends CollectionAbstractService {
  constructor(
    @Inject(CollectionUnitOfWork)
    private readonly collectionUnitOfWork: CollectionUnitOfWork,
    @Inject(JsonSchemaService)
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
        throw new BadRequestException('Invalid JSON schema');
      }

      const entity = CollectionEntity.create({
        userId: command.user.id,
        name: new NameVo(command.name),
        jsonSchema: new JsonVo(command.jsonSchema),
        version: 1,
      });

      return await collectionRepository.create(entity);
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
          throw new BadRequestException('Collection not found');
        }

        const { isValid } = this.jsonSchemaService.validateData(
          collection.jsonSchema.getValue(),
          command.jsonFields,
        );

        if (!isValid) {
          throw new BadRequestException('Invalid JSON fields');
        }

        const entity = CollectionItemEntity.create({
          collectionId: command.collectionId,
          userId: command.user.id,
          jsonFields: new JsonVo(command.jsonFields),
          name: new NameVo(command.name),
        });

        await entity.validate();

        return await collectionItemRepository.create(entity);
      },
    );
  }
}
