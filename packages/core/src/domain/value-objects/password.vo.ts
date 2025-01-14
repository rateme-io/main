import { z } from 'zod';
import { BaseValueObject } from '@/domain/common';

export class PasswordVo extends BaseValueObject<string> {
   constructor(password: string) {
    super(password, PasswordVo.schema);
  }

  static schema = z.string().min(8);
}