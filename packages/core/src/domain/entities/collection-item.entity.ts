import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from './user.entity';
import { CollectionEntity } from './collection.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';
import { NameVo } from '@/domain/value-objects/name.vo';

export class CollectionItemEntity extends BaseEntity {
  user?: UserEntity;

  @ZodValidator(z.string())
  userId: string;

  collection?: CollectionEntity;

  @ZodValidator(z.string())
  collectionId: string;

  name: NameVo;

  @ZodValidator(z.object({}))
  jsonFields: object;

  static create(command: CreatEntityCommand<CollectionItemEntity>) {
    const entity = new CollectionItemEntity();

    entity.jsonFields = command.jsonFields;
    entity.name = command.name;
    entity.user = command.user;
    entity.userId = command.userId;
    entity.collection = command.collection;
    entity.collectionId = command.collectionId;

    addBaseFields(entity, command);

    return entity;
  }
}