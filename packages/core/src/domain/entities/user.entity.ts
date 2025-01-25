import { z } from 'zod';

import {
  addBaseFields,
  BaseEntity,
  CreatEntityCommand,
} from '@/domain/common/base.entity';
import { ZodValidator } from '@/domain/common/zod-validator';
import { EmailVo } from '@/domain/value-objects/email.vo';
import { LogoUrlVo } from '@/domain/value-objects/logo-url.vo';
import { NameVo } from '@/domain/value-objects/name.vo';
import { UsernameVo } from '@/domain/value-objects/username.vo';

export enum UserVerifiedStatus {
  pending = 'pending',
  verified = 'verified',
}

export class UserEntity extends BaseEntity {
  email: EmailVo;

  username: UsernameVo;

  name: NameVo;

  logoUrl: LogoUrlVo;

  @ZodValidator(z.nativeEnum(UserVerifiedStatus))
  verifiedStatus: UserVerifiedStatus;

  static create(command: CreatEntityCommand<UserEntity>) {
    const user = new UserEntity();

    user.email = command.email;
    user.username = command.username;
    user.name = command.name;
    user.verifiedStatus = command.verifiedStatus;
    user.logoUrl = command.logoUrl;

    addBaseFields(user, command);

    return user;
  }
}
