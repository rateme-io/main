import { action } from '@reatom/framework';

import { EmailVo } from '@rateme/core/domain/value-objects/email.vo';
import { NameVo } from '@rateme/core/domain/value-objects/name.vo';
import { PasswordVo } from '@rateme/core/domain/value-objects/password.vo';
import { UsernameVo } from '@rateme/core/domain/value-objects/username.vo';

import { registerAction } from '@/entities/session';
import { disclosureAtom } from '@/shared/atoms/disclosure.atom.ts';
import { fieldAtom } from '@/shared/atoms/field.atom.ts';
import { formAtom } from '@/shared/atoms/form.atom.ts';

export const registerDisclosure = disclosureAtom({
  defaultIsOpened: false,
  name: 'registerDisclosure',
});

export const emailField = fieldAtom({
  defaultValue: '',
  schema: EmailVo.schema,
  name: 'emailField',
});

export const passwordField = fieldAtom({
  defaultValue: '',
  schema: PasswordVo.schema,
  name: 'passwordField',
});

export const nameField = fieldAtom({
  defaultValue: '',
  schema: NameVo.schema,
  name: 'nameField',
});

export const usernameField = fieldAtom({
  defaultValue: '',
  schema: UsernameVo.schema,
  name: 'usernameField',
});

export const registerForm = formAtom({
  fields: {
    email: emailField,
    password: passwordField,
    name: nameField,
    username: usernameField,
  },
  onSubmit: action(async (ctx, { email, password, name, username }) => {
    const result = await ctx.schedule(() =>
      registerAction(ctx, {
        type: 'token',
        dto: {
          email: email.trim(),
          password,
          name: name.trim(),
          username: username.trim(),
        },
      }),
    );

    if (result.error) {
      throw new Error(result.error.type);
    }
  }, 'registerForm.onSubmit'),
  name: 'registerForm',
});
