import { z } from 'zod';
import { EmailVo } from '@/domain/value-objects/email.vo';
import { UsernameVo } from '@/domain/value-objects/username.vo';
import { NameVo } from '@/domain/value-objects/name.vo';
import { LogoUrlVo } from '@/domain/value-objects/logo-url.vo';
import { PasswordVo } from '@/domain/value-objects/password.vo';

export const TokenRegisterDtoSchema = z.object({
  email: EmailVo.schema,
  password: PasswordVo.schema,
  name: NameVo.schema,
  username: UsernameVo.schema,
  logoUrl: LogoUrlVo.schema.optional(),
});

export type TokenRegisterDto = z.infer<typeof TokenRegisterDtoSchema>;