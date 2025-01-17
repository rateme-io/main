import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from '@/domain/entities/user.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { CollectionEntity } from '@/domain/entities/collection.entity';
import { RatingSystemEntity } from '@/domain/entities/rating-system.entity';
import { z } from 'zod';

export class RatingEntity extends BaseEntity {
  user: UserEntity;

  collection: CollectionEntity;

  ratingSystem: RatingSystemEntity;

  @ZodValidator(z.object({}))
  jsonRates: object;

  static create(command: CreatEntityCommand<RatingEntity>) {
    const entity = new RatingEntity();

    entity.jsonRates = command.jsonRates;
    entity.user = command.user;
    entity.collection = command.collection;
    entity.ratingSystem = command.ratingSystem;

    addBaseFields(entity, command);

    return entity;
  }
}