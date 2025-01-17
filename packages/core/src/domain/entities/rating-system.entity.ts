import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from '@/domain/entities/user.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';

export class RatingSystemEntity extends BaseEntity {
  user: UserEntity;

  @ZodValidator(z.number())
  version: number;

  @ZodValidator(z.object({}))
  jsonSchema: object;

  @ZodValidator(z.object({}))
  jsonFormula: object;

  static create(command: CreatEntityCommand<RatingSystemEntity>) {
    const entity = new RatingSystemEntity();

    entity.jsonFormula = command.jsonFormula;
    entity.jsonSchema = command.jsonSchema;
    entity.version = command.version;
    entity.user = command.user;

    addBaseFields(entity, command);

    return entity;
  }
}