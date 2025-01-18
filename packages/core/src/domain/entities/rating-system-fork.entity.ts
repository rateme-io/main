import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { RatingSystemEntity } from './rating-system.entity';
import { z } from 'zod';
import { ZodValidator } from '@/domain/common/zod-validator';

export class RatingSystemForkEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  original?: RatingSystemEntity;

  @ZodValidator(z.string())
  originalId: string;

  forked?: RatingSystemEntity;

  @ZodValidator(z.string())
  forkedId: string;

  static create(command: CreatEntityCommand<RatingSystemForkEntity>) {
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