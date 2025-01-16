import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from './user.entity';
import { CollectionEntity } from './collection.entity';

export class CollectionHierarchyEntity extends BaseEntity {
  user: UserEntity;

  parent: CollectionEntity;

  child: CollectionEntity;

  static create(command: CreatEntityCommand<CollectionHierarchyEntity>) {
    const entity = new CollectionHierarchyEntity();

    entity.user = command.user;
    entity.parent = command.parent;
    entity.child = command.child;

    addBaseFields(entity, command);

    return entity;
  }
}