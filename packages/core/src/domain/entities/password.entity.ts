import {
  addBaseFields,
  BaseEntity,
  CreateEntityCommand,
} from '@/domain/common/base.entity';
import { UserEntity } from '@/domain/entities/user.entity';
import { PasswordVo } from '@/domain/value-objects/password.vo';

export class PasswordEntity extends BaseEntity {
  hash: PasswordVo;

  user: UserEntity;

  static create(command: CreateEntityCommand<PasswordEntity>) {
    const entity = new PasswordEntity();

    entity.hash = command.hash;
    entity.user = command.user;

    addBaseFields(entity, command);

    return entity;
  }
}
