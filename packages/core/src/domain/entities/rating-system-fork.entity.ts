import { z } from 'zod';

import {
  addBaseFields,
  BaseEntity,
  CreateEntityCommand,
} from '@/domain/common/base.entity';
import { ZodValidator } from '@/domain/common/zod-validator';

import { RatingSystemEntity } from './rating-system.entity';

export class RatingSystemForkEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  original?: RatingSystemEntity;

  @ZodValidator(z.string())
  originalId: string;

  forked?: RatingSystemEntity;

  @ZodValidator(z.string())
  forkedId: string;

  static create(command: CreateEntityCommand<RatingSystemForkEntity>) {
    const entity = new RatingSystemForkEntity();

    entity.userId = command.userId;
    entity.original = command.original;
    entity.originalId = command.originalId;
    entity.forked = command.forked;
    entity.forkedId = command.forkedId;

    addBaseFields(entity, command);

    return entity;
  }
}
