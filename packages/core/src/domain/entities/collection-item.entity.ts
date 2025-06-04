import { z } from 'zod';

import {
  addBaseFields,
  BaseEntity,
  CreateEntityCommand,
} from '@/domain/common/base.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { JsonVo } from '@/domain/value-objects/json.vo';
import { NameVo } from '@/domain/value-objects/name.vo';

export class CollectionItemEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.string())
  collectionId: string;

  name: NameVo;

  jsonFields: JsonVo;

  static create(command: CreateEntityCommand<CollectionItemEntity>) {
    const entity = new CollectionItemEntity();

    entity.jsonFields = command.jsonFields;
    entity.name = command.name;
    entity.userId = command.userId;
    entity.collectionId = command.collectionId;

    addBaseFields(entity, command);

    return entity;
  }
}
