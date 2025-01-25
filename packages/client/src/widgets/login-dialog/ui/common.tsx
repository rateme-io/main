import { Input, Stack } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { FunctionComponent } from 'react';

import {
  userNotFoundError,
  wrongCredentialsError,
} from '@rateme/core/domain/dtos/token-auth/errors';

import { Field } from '@/shared/ui/field.tsx';
import { PasswordInput } from '@/shared/ui/password-input.tsx';

import { emailField, passwordField } from '../model.ts';

export const EmailField: FunctionComponent = reatomComponent(({ ctx }) => {
  return (
    <Field
      label={t`Email`}
      invalid={!!ctx.spy(emailField.$error)}
      errorText={ctx.spy(emailField.$error) && <Trans>Wrong email</Trans>}
      required
    >
      <Input
        formNoValidate
        type={'email'}
        placeholder={t`Enter your email`}
        autoComplete={'email'}
        value={ctx.spy(emailField.$value)}
        onChange={(e) => {
          emailField.$value(ctx, e.currentTarget.value);
        }}
      />
    </Field>
  );
}, 'EmailField');

export const PasswordField: FunctionComponent = reatomComponent(({ ctx }) => {
  return (
    <Field
      label={t`Password`}
      invalid={!!ctx.spy(passwordField.$error)}
      errorText={ctx.spy(passwordField.$error) && <Trans>Wrong password</Trans>}
      required
    >
      <Stack width={'100%'}>
        <PasswordInput
          placeholder={t`Enter your password`}
          value={ctx.spy(passwordField.$value)}
          autoComplete={'current-password'}
          onChange={(event) =>
            passwordField.$value(ctx, event.currentTarget.value)
          }
        />
      </Stack>
    </Field>
  );
}, 'PasswordField');

export const FormError: FunctionComponent<{ error: string }> = ({ error }) => {
  switch (error) {
    case wrongCredentialsError.type:
      return <Trans>Wrong credentials</Trans>;
    case userNotFoundError.type:
      return <Trans>User with this email does not exist</Trans>;
  }

  return null;
};
