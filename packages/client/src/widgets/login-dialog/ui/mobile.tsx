import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { useRef } from 'react';

import { AsyncFormDialog } from '@/shared/ui/async-form-dialog';
import { Button } from '@/shared/ui/button.tsx';

import { loginDisclosure, loginForm } from '../model';
import {
  EmailField,
  FormError,
  PasswordField,
  useHandleErrors,
} from './common';

export const MobileLoginDialog = reatomComponent(() => {
  const emailFieldRef = useRef<HTMLInputElement | null>(null);
  const passwordFieldRef = useRef<HTMLInputElement | null>(null);

  useHandleErrors({ passwordFieldRef, emailFieldRef });

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
      <EmailField inputRef={emailFieldRef} />

      <PasswordField inputRef={passwordFieldRef} />
    </AsyncFormDialog>
  );
}, 'MobileLoginDialog');

type SubmitButtonProps = { formId?: string };

const SubmitButton = reatomComponent<SubmitButtonProps>(({ ctx, formId }) => {
  return (
    <Button
      type={'submit'}
      width={'full'}
      marginTop={8}
      form={formId}
      loading={ctx.spy(loginForm.$isLoading)}
    >
      <Trans>Submit</Trans>
    </Button>
  );
}, 'SubmitButton');
