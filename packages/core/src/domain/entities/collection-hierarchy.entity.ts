import { z } from 'zod';

import {
  addBaseFields,
  BaseEntity,
  CreateEntityCommand,
} from '@/domain/common/base.entity';
import { ZodValidator } from '@/domain/common/zod-validator';

export class CollectionHierarchyEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.string())
  parentId: string;

  @ZodValidator(z.string())
  childId: string;

  static create(command: CreateEntityCommand<CollectionHierarchyEntity>) {
    const entity = new CollectionHierarchyEntity();

    entity.userId = command.userId;
    entity.parentId = command.parentId;
    entity.childId = command.childId;

    addBaseFields(entity, command);

    return entity;
  }
}
