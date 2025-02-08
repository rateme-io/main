import { Input, Stack } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useAtom } from '@reatom/npm-react';
import { FunctionComponent, RefObject, useEffect } from 'react';

import { wrongCredentialsError } from '@rateme/core/domain/dtos/token-auth/errors';

import { ButtonLink } from '@/shared/ui/button-link.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { InputGroup } from '@/shared/ui/input-group.tsx';
import { PasswordInput } from '@/shared/ui/password-input.tsx';
import { PasswordStrengthMeter } from '@/shared/ui/password-strength-meter.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import { loginDisclosure } from '@/widgets/login-dialog';

import {
  emailField,
  nameField,
  passwordField,
  registerDisclosure,
  registerForm,
  usernameField,
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
        <Stack width={'100%'} gap={3}>
          <PasswordInput
            ref={inputRef}
            placeholder={t`Enter your password`}
            value={ctx.spy(passwordField.$value)}
            autoComplete={'new-password'}
            onChange={(event) =>
              passwordField.$value(ctx, event.currentTarget.value)
            }
          />
          <PasswordStrengthMeter password={ctx.spy(passwordField.$value)} />
        </Stack>
      </Field>
    );
  },
  'PasswordField',
);

export const NameField = reatomMemo(({ ctx }) => {
  return (
    <Field
      label={t`Full name`}
      required
      invalid={!!ctx.spy(nameField.$error)}
      errorText={ctx.spy(nameField.$error) && t`Wrong full name`}
    >
      <Input
        placeholder={t`Enter your full name`}
        value={ctx.spy(nameField.$value)}
        autoComplete={'name'}
        onChange={(e) => nameField.$value(ctx, e.currentTarget.value)}
      />
    </Field>
  );
}, 'NameField');

export const UsernameField = reatomMemo(({ ctx }) => {
  return (
    <Field
      label={t`Username`}
      required
      invalid={!!ctx.spy(usernameField.$error)}
      errorText={ctx.spy(usernameField.$error) && t`Wrong username`}
    >
      <InputGroup startElement={'@'} width={'100%'}>
        <Input
          placeholder={t`Enter your username`}
          autoComplete={'username'}
          value={ctx.spy(usernameField.$value)}
          onChange={(e) => usernameField.$value(ctx, e.currentTarget.value)}
        />
      </InputGroup>
    </Field>
  );
}, 'UsernameField');

export const SignInLink = reatomMemo(({ ctx }) => {
  return (
    <ButtonLink
      onClick={() => {
        registerDisclosure.close(ctx);
        requestAnimationFrame(() => {
          loginDisclosure.open(ctx);
        });
      }}
    >
      <Trans>Already registered? Log in</Trans>
    </ButtonLink>
  );
}, 'SignInLink');

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
  const [error] = useAtom(registerForm.$formError);

  useEffect(() => {
    switch (error) {
      case wrongCredentialsError.type:
        return emailFieldRef.current?.focus();
    }
  }, [emailFieldRef, error]);
};
