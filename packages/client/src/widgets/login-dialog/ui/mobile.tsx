import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useRef } from 'react';

import { AsyncFormDialog } from '@/shared/ui/async-form-dialog';
import { Button } from '@/shared/ui/button.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { loginDisclosure, loginForm } from '../model';
import {
  EmailField,
  FormError,
  PasswordField,
  RegisterLink,
  useHandleErrors,
} from './common';

export const MobileLoginDialog = reatomMemo(() => {
  const emailFieldRef = useRef<HTMLInputElement | null>(null);

  useHandleErrors({ emailFieldRef });

  return (
    <AsyncFormDialog
      size={'full'}
      form={loginForm}
      disclosure={loginDisclosure}
      errorRenderer={(error) => <FormError error={error} />}
      initialFocusEl={() => emailFieldRef.current}
      title={
        <Text>
          <Trans>Authorisation</Trans>
        </Text>
      }
      afterError={<SubmitButton />}
    >
      <RegisterLink />

      <EmailField inputRef={emailFieldRef} />

      <PasswordField />
    </AsyncFormDialog>
  );
}, 'MobileLoginDialog');

type SubmitButtonProps = { formId?: string };

const SubmitButton = reatomMemo<SubmitButtonProps>(({ ctx, formId }) => {
  return (
    <Button
      type={'submit'}
      width={'full'}
      marginTop={8}
      form={formId}
      loading={ctx.spy(loginForm.$isLoading)}
    >
      <Trans>Sign in</Trans>
    </Button>
  );
}, 'SubmitButton');
