import { Flex, Input, Stack, Text } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { FunctionComponent } from 'react';

import { DisclosureAtom } from '@/shared/atoms/disclosure.atom.ts';
import { Dialog } from '@/shared/ui/dialog.tsx';
import { Field } from '@/shared/ui/field';
import { PasswordInput } from '@/shared/ui/password-input';

import { emailField, loginForm, passwordField } from './model.ts';

export type LoginDialogProps = {
  disclosure: DisclosureAtom;
};

export const LoginDialog = reatomComponent<LoginDialogProps>(
  ({ disclosure, ctx }) => {
    return (
      <Dialog
        disclosure={disclosure}
        onClose={() => loginForm.reset(ctx)}
        onSubmit={() => loginForm.submit(ctx)}
        title={
          <Text>
            <Trans>Authorisation</Trans>
          </Text>
        }
        submitLabel={<Trans>Submit</Trans>}
      >
        <Flex flexDirection={'column'} gap={4}>
          <EmailField />

          <PasswordField />
        </Flex>
      </Dialog>
    );
  },
  'LoginDialog',
);

const EmailField: FunctionComponent = reatomComponent(({ ctx }) => {
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
        value={ctx.spy(emailField.$value)}
        onChange={(e) => {
          emailField.$value(ctx, e.currentTarget.value);
        }}
      />
    </Field>
  );
}, 'EmailField');

const PasswordField: FunctionComponent = reatomComponent(({ ctx }) => {
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
          onChange={(event) =>
            passwordField.$value(ctx, event.currentTarget.value)
          }
        />
      </Stack>
    </Field>
  );
}, 'PasswordField');
