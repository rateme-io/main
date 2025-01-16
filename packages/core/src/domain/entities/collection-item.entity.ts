import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from './user.entity';
import { CollectionEntity } from './collection.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';

export class CollectionItemEntity extends BaseEntity {
  user: UserEntity;

  collection: CollectionEntity;

  @ZodValidator(z.string().min(1).max(255))
  name: string;

  @ZodValidator(z.object({}))
  jsonFields: object;

  static create(command: CreatEntityCommand<CollectionItemEntity>) {
    const entity = new CollectionItemEntity();

    entity.jsonFields = command.jsonFields;
    entity.name = command.name;
    entity.user = command.user;
    entity.collection = command.collection;

    addBaseFields(entity, command);

    return entity;
  }
}