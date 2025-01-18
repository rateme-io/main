import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from './user.entity';
import { CollectionEntity } from './collection.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';

export class CollectionForkEntity extends BaseEntity {
  user?: UserEntity;

  @ZodValidator(z.string())
  userId: string;

  original?: CollectionEntity;

  @ZodValidator(z.string())
  originalId: string;

  forked?: CollectionEntity;

  @ZodValidator(z.string())
  forkedId: string;

  static create(command: CreatEntityCommand<CollectionForkEntity>) {
    const entity = new CollectionForkEntity();

    entity.user = command.user;
    entity.userId = command.userId;
    entity.original = command.original;
    entity.originalId = command.originalId;
    entity.forked = command.forked;
    entity.forkedId = command.forkedId;

    addBaseFields(entity, command);

    return entity;
  }
}