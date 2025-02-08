import { RefinementCtx, z, ZodType } from 'zod';

import { BaseValueObject } from '@/domain/common/base.value-object';

export class PasswordVo extends BaseValueObject<string> {
  constructor(password: string) {
    super(password, PasswordVo.schema);
  }

  static checks: PasswordCheck[] = [
    {
      type: 'length',
      schema: z.string().min(12, {
        message: 'Password must be At least 12 characters long',
      }),
    },
    {
      type: 'no-white-space',
      schema: z.string().regex(/^\S+$/, {
        message: 'Password must not contain white spaces',
      }),
    },
    {
      type: 'uppercase',
      schema: z.string().regex(/[A-Z]/, {
        message:
          'Password must contain Must include at least one uppercase letter',
      }),
    },
    {
      type: 'lowercase',
      schema: z.string().regex(/[a-z]/, {
        message:
          'Password must contain Must include at least one lowercase letter',
      }),
    },
    {
      type: 'digit',
      schema: z.string().regex(/[0-9]/, {
        message: 'Password must contain Must contain at least one digit',
      }),
    },
    {
      type: 'special',
      schema: z.string().regex(/[^A-Za-z0-9]/, {
        message:
          'Password must contain Must include at least one special character',
      }),
    },
    {
      type: 'consecutive',
      schema: z
        .string()
        .min(1)
        .superRefine((password: string, ctx: RefinementCtx) => {
          if (/(\w)\1{2,}/.test(password)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message:
                'Password must not contain more than two consecutive identical characters',
            });
          }
        }),
    },
    {
      type: 'common',
      schema: z
        .string()
        .min(1)
        .superRefine((password: string, ctx: RefinementCtx) => {
          if (/1234|abcd|qwerty|password|letmein/i.test(password)) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              fatal: true,
              message:
                'Password must not contain common patterns or weak sequences',
            });
          }
        }),
    },
  ];

  static schema = z.string().superRefine((password, ctx) => {
    PasswordVo.checks.forEach(({ schema }) => {
      const result = schema.safeParse(password);

      result.error?.errors.forEach((error) => {
        ctx.addIssue(error);
      });
    });
  });

  static simpleSchema = z.string().min(1, { message: 'Password is required' });
}

export type PasswordCheck = {
  type: string;
  schema: ZodType<string>;
};
