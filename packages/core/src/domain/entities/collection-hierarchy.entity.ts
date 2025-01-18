import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from './user.entity';
import { CollectionEntity } from './collection.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';

export class CollectionHierarchyEntity extends BaseEntity {
  user?: UserEntity

  @ZodValidator(z.string())
  userId: string;

  parent?: CollectionEntity;

  @ZodValidator(z.string())
  parentId: string;

  child?: CollectionEntity;

  @ZodValidator(z.string())
  childId: string;

  static create(command: CreatEntityCommand<CollectionHierarchyEntity>) {
    const entity = new CollectionHierarchyEntity();

    entity.user = command.user;
    entity.userId = command.userId;
    entity.parent = command.parent;
    entity.parentId = command.parentId;
    entity.child = command.child;
    entity.childId = command.childId;

    addBaseFields(entity, command);

    return entity;
  }
}