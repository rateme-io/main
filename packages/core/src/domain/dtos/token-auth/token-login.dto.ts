import { z } from 'zod';
import { EmailVo } from '@/domain/value-objects/email.vo';
import { PasswordVo } from '@/domain/value-objects/password.vo';

export const TokenLoginDtoSchema = z.object({
  email: EmailVo.schema,
  password: PasswordVo.schema,
})

export type TokenLoginDto = z.infer<typeof TokenLoginDtoSchema>;

