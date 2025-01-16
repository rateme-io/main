import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from '@/domain/entities/user.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';

export class CollectionEntity extends BaseEntity {
  user: UserEntity;

  @ZodValidator(z.string().min(1).max(255))
  name: string;

  @ZodValidator(z.object({}))
  jsonSchema: object;

  @ZodValidator(z.number())
  version: number;

  static create(command: CreatEntityCommand<CollectionEntity>) {
    const entity = new CollectionEntity();

    entity.jsonSchema = command.jsonSchema;
    entity.name = command.name;
    entity.version = command.version;
    entity.user = command.user;

    addBaseFields(entity, command);

    return entity;
  }
}