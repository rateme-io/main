import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from './user.entity';
import { CollectionEntity } from './collection.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';
import { NameVo } from '@/domain/value-objects/name.vo';
import { JsonVo } from '@/domain/value-objects/json.vo';

export class CollectionItemEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.string())
  collectionId: string;

  name: NameVo;

  jsonFields: JsonVo;

  static create(command: CreatEntityCommand<CollectionItemEntity>) {
    const entity = new CollectionItemEntity();

    entity.jsonFields = command.jsonFields;
    entity.name = command.name;
    entity.userId = command.userId;
    entity.collectionId = command.collectionId;

    addBaseFields(entity, command);

    return entity;
  }
}