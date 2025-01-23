import { action } from '@reatom/framework';

import { EmailVo } from '@rateme/core/domain/value-objects/email.vo';
import { PasswordVo } from '@rateme/core/domain/value-objects/password.vo';

import { login } from '@/entities/session';
import { fieldAtom } from '@/shared/atoms/field.atom.ts';
import { formAtom } from '@/shared/atoms/form.atom.ts';

export const emailField = fieldAtom({
  defaultValue: '',
  schema: EmailVo.schema,
});

export const passwordField = fieldAtom({
  defaultValue: '',
  schema: PasswordVo.simpleSchema,
});

export const loginForm = formAtom({
  fields: {
    email: emailField,
    password: passwordField,
  },
  onSubmit: action(async (ctx, { email, password }) => {
    login(ctx, { type: 'token', dto: { email, password } });
  }, 'loginForm.onSubmit'),
});
