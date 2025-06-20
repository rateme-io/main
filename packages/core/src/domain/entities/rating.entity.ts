import { z } from 'zod';

import {
  addBaseFields,
  BaseEntity,
  CreateEntityCommand,
} from '@/domain/common/base.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { JsonVo } from '@/domain/value-objects/json.vo';

export class RatingEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.string())
  collectionId: string;

  @ZodValidator(z.string())
  ratingSystemId: string;

  jsonRates: JsonVo;

  static create(command: CreateEntityCommand<RatingEntity>) {
    const entity = new RatingEntity();

    entity.jsonRates = command.jsonRates;
    entity.userId = command.userId;
    entity.collectionId = command.collectionId;
    entity.ratingSystemId = command.ratingSystemId;

    addBaseFields(entity, command);

    return entity;
  }
}
