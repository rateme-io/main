import { z } from 'zod';
import { EmailVo } from '@/domain/value-objects/email.vo';

export const TokenLoginDtoSchema = z.object({
  email: EmailVo.schema,
  password: z.string(),
});

export type TokenLoginDto = z.infer<typeof TokenLoginDtoSchema>;

