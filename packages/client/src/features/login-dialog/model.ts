import { action } from '@reatom/framework';

import { loginAction } from '@/entities/session';
import { disclosureAtom } from '@/shared/atoms/disclosure.atom.ts';
import { fieldAtom } from '@/shared/atoms/field.atom.ts';
import { formAtom } from '@/shared/atoms/form.atom.ts';

import { EmailVo } from '../../../../core/src/domain/value-objects/email.vo.ts';
import { PasswordVo } from '../../../../core/src/domain/value-objects/password.vo.ts';

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
        type: 'token',
        dto: { email: email.trim(), password },
      }),
    );

    if (result.error) {
      throw new Error(result.error.type);
    }
  }, 'loginForm.onSubmit'),
  name: 'loginForm',
});
