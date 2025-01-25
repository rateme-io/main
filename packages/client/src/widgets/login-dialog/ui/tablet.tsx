import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { useRef } from 'react';

import { AsyncFormDialog } from '@/shared/ui/async-form-dialog.tsx';

import { loginDisclosure, loginForm } from '../model';
import {
  EmailField,
  FormError,
  PasswordField,
  useHandleErrors,
} from './common';

export const TabletLoginDialog = reatomComponent(() => {
  const emailFieldRef = useRef<HTMLInputElement | null>(null);
  const passwordFieldRef = useRef<HTMLInputElement | null>(null);

  useHandleErrors({ passwordFieldRef, emailFieldRef });

  return (
    <AsyncFormDialog
      size={'sm'}
      form={loginForm}
      disclosure={loginDisclosure}
      initialFocusEl={() => emailFieldRef.current}
      errorRenderer={(error) => <FormError error={error} />}
      title={
        <Text>
          <Trans>Authorisation</Trans>
        </Text>
      }
      submitLabel={<Trans>Submit</Trans>}
    >
      <EmailField inputRef={emailFieldRef} />

      <PasswordField inputRef={passwordFieldRef} />
    </AsyncFormDialog>
  );
}, 'TabletLoginDialog');
