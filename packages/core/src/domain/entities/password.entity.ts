import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { PasswordVo } from '@/domain/value-objects/password.vo';
import { UserEntity } from '@/domain/entities/user.entity';

export class PasswordEntity extends BaseEntity {
  hash: PasswordVo;

  user: UserEntity;

  static create(command: CreatEntityCommand<PasswordEntity>) {
    const password = new PasswordEntity();

    password.hash = command.hash;
    password.user = command.user;

    addBaseFields(password, command);

    return password;

  }
}