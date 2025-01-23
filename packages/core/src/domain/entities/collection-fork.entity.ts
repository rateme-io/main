import { z } from 'zod';

import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { ZodValidator } from '@/domain/common/zod-validator';

export class CollectionForkEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.string())
  originalId: string;

  @ZodValidator(z.string())
  forkedId: string;

  static create(command: CreatEntityCommand<CollectionForkEntity>) {
    const entity = new CollectionForkEntity();

    entity.userId = command.userId;
    entity.originalId = command.originalId;
    entity.forkedId = command.forkedId;

    addBaseFields(entity, command);

    return entity;
  }
}
