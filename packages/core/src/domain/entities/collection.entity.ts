import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';
import { NameVo } from '@/domain/value-objects/name.vo';
import { JsonVo } from '@/domain/value-objects/json.vo';

export class CollectionEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  name: NameVo;

  jsonSchema: JsonVo;

  @ZodValidator(z.number())
  version: number;

  static create(command: CreatEntityCommand<CollectionEntity>) {
    const entity = new CollectionEntity();

    entity.jsonSchema = command.jsonSchema;
    entity.name = command.name;
    entity.version = command.version;
    entity.userId = command.userId;

    addBaseFields(entity, command);

    return entity;
  }
}