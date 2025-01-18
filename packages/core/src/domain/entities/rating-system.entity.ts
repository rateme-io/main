import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';
import { JsonVo } from '@/domain/value-objects/json.vo';

export class RatingSystemEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.number())
  version: number;

  jsonSchema: JsonVo;

  jsonFormula: JsonVo;

  static create(command: CreatEntityCommand<RatingSystemEntity>) {
    const entity = new RatingSystemEntity();

    entity.jsonFormula = command.jsonFormula;
    entity.jsonSchema = command.jsonSchema;
    entity.version = command.version;
    entity.userId = command.userId;

    addBaseFields(entity, command);

    return entity;
  }
}