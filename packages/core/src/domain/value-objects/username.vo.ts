import { z } from 'zod';
import { BaseValueObject } from '@/domain/common';

export class UsernameVo extends BaseValueObject<string> {
   constructor(username: z.infer<typeof UsernameVo.schema>) {
    super(username, UsernameVo.schema);
  }

  static schema = z.string().min(1);
}