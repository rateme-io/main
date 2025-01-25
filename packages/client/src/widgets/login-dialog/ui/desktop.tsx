import { Flex, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { useRef } from 'react';

import { AsyncFormDialog } from '@/shared/ui/async-form-dialog.tsx';
import { CapsLockWarn } from '@/shared/ui/caps-lock-warn.tsx';

import { loginDisclosure, loginForm } from '../model';
import {
  EmailField,
  FormError,
  PasswordField,
  RegisterLink,
  useHandleErrors,
} from './common';

export const DesktopLoginDialog = reatomComponent(() => {
  const emailFieldRef = useRef<HTMLInputElement | null>(null);

  useHandleErrors({ emailFieldRef });

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
      submitLabel={<Trans>Sign in</Trans>}
    >
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <RegisterLink />

        <CapsLockWarn />
      </Flex>

      <EmailField inputRef={emailFieldRef} />

      <PasswordField />
    </AsyncFormDialog>
  );
}, 'DesktopLoginDialog');
