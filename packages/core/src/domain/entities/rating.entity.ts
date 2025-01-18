import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';
import { JsonVo } from '@/domain/value-objects/json.vo';

export class RatingEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.string())
  collectionId: string;

  @ZodValidator(z.string())
  ratingSystemId: string;

  jsonRates: JsonVo;

  static create(command: CreatEntityCommand<RatingEntity>) {
    const entity = new RatingEntity();

    entity.jsonRates = command.jsonRates;
    entity.userId = command.userId;
    entity.collectionId = command.collectionId;
    entity.ratingSystemId = command.ratingSystemId;

    addBaseFields(entity, command);

    return entity;
  }
}