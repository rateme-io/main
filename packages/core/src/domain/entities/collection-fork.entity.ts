import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from './user.entity';
import { CollectionEntity } from './collection.entity';

export class CollectionForkEntity extends BaseEntity {
  user: UserEntity;

  original: CollectionEntity;

  forked: CollectionEntity;

  static create(command: CreatEntityCommand<CollectionForkEntity>) {
    const entity = new CollectionForkEntity();

    entity.user = command.user;
    entity.original = command.original;
    entity.forked = command.forked;

    addBaseFields(entity, command);

    return entity;
  }
}