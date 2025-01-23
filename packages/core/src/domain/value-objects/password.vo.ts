import { z } from 'zod';
import { BaseValueObject } from '@/domain/common';

export class PasswordVo extends BaseValueObject<string> {
  constructor(password: string) {
    super(password, PasswordVo.schema);
  }

  static schema = z.string().superRefine((password, ctx) => {
    if (password.length < 12) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        message: 'Password must be at least 12 characters long',
      });
    }

    if (!/[A-Z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one uppercase letter',
      });
    }

    if (!/[a-z]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one lowercase letter',
      });
    }

    if (!/[0-9]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one digit',
      });
    }

    if (!/[^A-Za-z0-9]/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least one special character',
      });
    }

    if ((password.match(/[^A-Za-z0-9]/g) || []).length < 2) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must contain at least two special characters',
      });
    }

    if (/(\w)\1{2,}/.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Password must not contain more than two consecutive identical characters',
      });
    }

    if (/1234|abcd|qwerty|password|letmein/i.test(password)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        fatal: true,
        message: 'Password must not contain common patterns or weak sequences',
      });
    }
  });
}
