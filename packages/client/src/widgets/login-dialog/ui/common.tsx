import { Input, Stack } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useAtom } from '@reatom/npm-react';
import { FunctionComponent, RefObject, useEffect } from 'react';

import { wrongCredentialsError } from '@rateme/core/domain/dtos/token-auth/errors';

import { ButtonLink } from '@/shared/ui/button-link.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { PasswordInput } from '@/shared/ui/password-input.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import { registerDisclosure } from '@/widgets/register-dialog';

import {
  emailField,
  loginDisclosure,
  loginForm,
  passwordField,
} from '../model.ts';

export type EmailFieldProps = {
  inputRef?: RefObject<HTMLInputElement>;
};

export const EmailField = reatomMemo<EmailFieldProps>(({ ctx, inputRef }) => {
  return (
    <Field
      label={t`Email`}
      invalid={!!ctx.spy(emailField.$error)}
      errorText={ctx.spy(emailField.$error) && <Trans>Wrong email</Trans>}
      required
    >
      <Input
        ref={inputRef}
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

export type PasswordFieldProps = {
  inputRef?: RefObject<HTMLInputElement>;
};

export const PasswordField = reatomMemo<PasswordFieldProps>(
  ({ ctx, inputRef }) => {
    return (
      <Field
        label={t`Password`}
        invalid={!!ctx.spy(passwordField.$error)}
        errorText={
          ctx.spy(passwordField.$error) && <Trans>Wrong password</Trans>
        }
        required
      >
        <Stack width={'100%'}>
          <PasswordInput
            ref={inputRef}
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
  },
  'PasswordField',
);

export const RegisterLink = reatomMemo(({ ctx }) => {
  return (
    <ButtonLink
      onClick={() => {
        loginDisclosure.close(ctx);
        requestAnimationFrame(() => {
          registerDisclosure.open(ctx);
        });
      }}
    >
      <Trans>No account? Register</Trans>
    </ButtonLink>
  );
}, 'RegisterLink');

export const FormError: FunctionComponent<{ error: string }> = ({ error }) => {
  switch (error) {
    case wrongCredentialsError.type:
      return <Trans>Wrong credentials</Trans>;
  }

  return null;
};

export const useHandleErrors = ({
  emailFieldRef,
}: {
  emailFieldRef: RefObject<HTMLInputElement>;
}) => {
  const [error] = useAtom(loginForm.$formError);

  useEffect(() => {
    switch (error) {
      case wrongCredentialsError.type:
        return emailFieldRef.current?.focus();
    }
  }, [emailFieldRef, error]);
};
