import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { PasswordVo } from '@/domain/value-objects/password.vo';
import { UserEntity } from '@/domain/entities/user.entity';

export class PasswordEntity extends BaseEntity {
  hash: PasswordVo;

  user: UserEntity;

  static create(command: CreatEntityCommand<PasswordEntity>) {
    const entity = new PasswordEntity();

    entity.hash = command.hash;
    entity.user = command.user;

    addBaseFields(entity, command);

    return entity;

  }
}