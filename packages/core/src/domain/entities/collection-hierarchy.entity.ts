import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';

export class CollectionHierarchyEntity extends BaseEntity {
  @ZodValidator(z.string())
  userId: string;

  @ZodValidator(z.string())
  parentId: string;

  @ZodValidator(z.string())
  childId: string;

  static create(command: CreatEntityCommand<CollectionHierarchyEntity>) {
    const entity = new CollectionHierarchyEntity();

    entity.userId = command.userId;
    entity.parentId = command.parentId;
    entity.childId = command.childId;

    addBaseFields(entity, command);

    return entity;
  }
}