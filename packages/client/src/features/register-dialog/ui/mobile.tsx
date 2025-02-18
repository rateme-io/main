import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useRef } from 'react';

import { AsyncFormDialog } from '@/shared/ui/async-form-dialog.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { registerDisclosure, registerForm } from '../model.ts';
import {
  EmailField,
  FormError,
  NameField,
  PasswordField,
  SignInLink,
  useHandleErrors,
  UsernameField,
} from './common.tsx';

export const MobileRegisterDialog = reatomMemo(() => {
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
          <Trans>Authentication</Trans>
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

const SubmitButton = reatomMemo<SubmitButtonProps>(({ ctx, formId }) => {
  return (
    <Button
      type={'submit'}
      width={'full'}
      marginTop={8}
      form={formId}
      loading={ctx.spy(registerForm.$isLoading)}
    >
      <Trans>Sign up</Trans>
    </Button>
  );
}, 'SubmitButton');
