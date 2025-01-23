import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { UserEntity } from '@/domain/entities/user.entity';
import { PasswordVo } from '@/domain/value-objects/password.vo';

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
