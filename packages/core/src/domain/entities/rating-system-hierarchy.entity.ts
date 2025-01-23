import { z } from 'zod';

import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { ZodValidator } from '@/domain/common/zod-validator';

export class RatingSystemHierarchyEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.string())
  parentId: string;

  @ZodValidator(z.string())
  childId: string;

  static create(command: CreatEntityCommand<RatingSystemHierarchyEntity>) {
    const entity = new RatingSystemHierarchyEntity();

    entity.userId = command.userId;
    entity.parentId = command.parentId;
    entity.childId = command.childId;

    addBaseFields(entity, command);

    return entity;
  }
}
