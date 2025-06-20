import { z } from 'zod';

import {
  addBaseFields,
  BaseEntity,
  CreateEntityCommand,
} from '@/domain/common/base.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { JsonVo } from '@/domain/value-objects/json.vo';
import { NameVo } from '@/domain/value-objects/name.vo';

export class RatingSystemEntity extends BaseEntity {
  name: NameVo;

  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.number())
  version: number;

  jsonSchema: JsonVo;

  jsonFormula: JsonVo;

  static create(command: CreateEntityCommand<RatingSystemEntity>) {
    const entity = new RatingSystemEntity();

    entity.name = command.name;
    entity.jsonFormula = command.jsonFormula;
    entity.jsonSchema = command.jsonSchema;
    entity.version = command.version;
    entity.userId = command.userId;

    addBaseFields(entity, command);

    return entity;
  }
}
