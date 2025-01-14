import { addBaseFields, BaseEntity, CreatEntityCommand } from '@/domain/common';
import { EmailVo } from '@/domain/value-objects/email.vo';
import { UsernameVo } from '@/domain/value-objects/username.vo';
import { NameVo } from '@/domain/value-objects/name.vo';
import { LogoUrlVo } from '@/domain/value-objects/logo-url.vo';
import { ZodValidator } from '@/domain/common/zod-validator';
import { z } from 'zod';

export class UserEntity extends BaseEntity {
  email: EmailVo;

  username: UsernameVo;

  name: NameVo;

  logoUrl: LogoUrlVo;

  @ZodValidator(z.boolean())
  isVerified: boolean;

  static create(command: CreatEntityCommand<UserEntity>) {
    const user = new UserEntity();

    user.email = command.email;
    user.username = command.username;
    user.name = command.name;
    user.isVerified = command.isVerified;
    user.logoUrl = command.logoUrl;

    addBaseFields(user, command);

    return user;
  }
}