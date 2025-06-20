import { action } from '@reatom/framework';

import { EmailVo } from '@rateme/core/domain/value-objects/email.vo';
import { PasswordVo } from '@rateme/core/domain/value-objects/password.vo';

import { loginAction } from '@/entities/session';
import { disclosureAtom } from '@/shared/atoms/disclosure.atom.ts';
import { fieldAtom } from '@/shared/atoms/field.atom.ts';
import { formAtom } from '@/shared/atoms/form.atom.ts';

export const loginDisclosure = disclosureAtom({
  defaultIsOpened: false,
  name: 'loginDisclosure',
});

export const emailField = fieldAtom({
  defaultValue: '',
  schema: EmailVo.schema,
  name: 'emailField',
});

export const passwordField = fieldAtom({
  defaultValue: '',
  schema: PasswordVo.simpleSchema,
  name: 'passwordField',
});

export const loginForm = formAtom({
  fields: {
    email: emailField,
    password: passwordField,
  },
  onSubmit: action(async (ctx, { email, password }) => {
    const result = await ctx.schedule((ctx) =>
      loginAction(ctx, {
        type: 'password',
        dto: { email: email.trim(), password },
      }),
    );

    if (result.error) {
      throw new Error(result.error.type);
    }
  }, 'loginForm.onSubmit'),
  name: 'loginForm',
});
