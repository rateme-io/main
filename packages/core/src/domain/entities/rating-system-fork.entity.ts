import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from './user.entity';
import { RatingSystemEntity } from './rating-system.entity';

export class RatingSystemForkEntity extends BaseEntity {
  user: UserEntity;

  original: RatingSystemEntity;

  forked: RatingSystemEntity;

  static create(command: CreatEntityCommand<RatingSystemForkEntity>) {
    const entity = new RatingSystemForkEntity();

    entity.user = command.user;
    entity.original = command.original;
    entity.forked = command.forked;

    addBaseFields(entity, command);

    return entity;
  }
}