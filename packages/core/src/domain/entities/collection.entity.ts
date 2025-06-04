import { z } from 'zod';

import {
  addBaseFields,
  BaseEntity,
  CreateEntityCommand,
} from '@/domain/common/base.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { JsonVo } from '@/domain/value-objects/json.vo';
import { NameVo } from '@/domain/value-objects/name.vo';

export class CollectionEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  name: NameVo;

  jsonSchema: JsonVo;

  @ZodValidator(z.number())
  version: number;

  static create(command: CreateEntityCommand<CollectionEntity>) {
    const entity = new CollectionEntity();

    entity.jsonSchema = command.jsonSchema;
    entity.name = command.name;
    entity.version = command.version;
    entity.userId = command.userId;

    addBaseFields(entity, command);

    return entity;
  }
}
