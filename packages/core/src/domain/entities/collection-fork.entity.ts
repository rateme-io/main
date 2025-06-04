import { z } from 'zod';

import {
  addBaseFields,
  BaseEntity,
  CreateEntityCommand,
} from '@/domain/common/base.entity';
import { ZodValidator } from '@/domain/common/zod-validator';

export class CollectionForkEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.string())
  originalId: string;

  @ZodValidator(z.string())
  forkedId: string;

  static create(command: CreateEntityCommand<CollectionForkEntity>) {
    const entity = new CollectionForkEntity();

    entity.userId = command.userId;
    entity.originalId = command.originalId;
    entity.forkedId = command.forkedId;

    addBaseFields(entity, command);

    return entity;
  }
}
