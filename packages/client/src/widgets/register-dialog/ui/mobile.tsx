import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { useRef } from 'react';

import { AsyncFormDialog } from '@/shared/ui/async-form-dialog';
import { Button } from '@/shared/ui/button.tsx';

import { registerDisclosure, registerForm } from '../model';
import {
  EmailField,
  FormError,
  NameField,
  PasswordField,
  SignInLink,
  useHandleErrors,
  UsernameField,
} from './common';

export const MobileRegisterDialog = reatomComponent(() => {
  const emailFieldRef = useRef<HTMLInputElement | null>(null);

  useHandleErrors({ emailFieldRef });

  return (
    <AsyncFormDialog
      size={'full'}
      form={registerForm}
      disclosure={registerDisclosure}
      errorRenderer={(error) => <FormError error={error} />}
      initialFocusEl={() => emailFieldRef.current}
      title={
        <Text>
          <Trans>Authorisation</Trans>
        </Text>
      }
      afterError={<SubmitButton />}
    >
      <SignInLink />

      <NameField />

      <UsernameField />

      <EmailField inputRef={emailFieldRef} />

      <PasswordField />
    </AsyncFormDialog>
  );
}, 'MobileRegisterDialog');

type SubmitButtonProps = { formId?: string };

const SubmitButton = reatomComponent<SubmitButtonProps>(({ ctx, formId }) => {
  return (
    <Button
      type={'submit'}
      width={'full'}
      marginTop={8}
      form={formId}
      loading={ctx.spy(registerForm.$isLoading)}
    >
      <Trans>Create account</Trans>
    </Button>
  );
}, 'SubmitButton');
