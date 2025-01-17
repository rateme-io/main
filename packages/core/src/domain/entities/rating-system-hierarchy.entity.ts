import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from './user.entity';
import { RatingSystemEntity } from './rating-system.entity';

export class RatingSystemHierarchyEntity extends BaseEntity {
  user: UserEntity;

  parent: RatingSystemEntity;

  child: RatingSystemEntity;

  static create(command: CreatEntityCommand<RatingSystemHierarchyEntity>) {
    const entity = new RatingSystemHierarchyEntity();

    entity.user = command.user;
    entity.parent = command.parent;
    entity.child = command.child;

    addBaseFields(entity, command);

    return entity;
  }
}