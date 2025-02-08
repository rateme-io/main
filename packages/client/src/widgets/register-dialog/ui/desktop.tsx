import { Flex, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useRef } from 'react';

import { AsyncFormDialog } from '@/shared/ui/async-form-dialog.tsx';
import { CapsLockWarn } from '@/shared/ui/caps-lock-warn.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

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

export const DesktopRegisterDialog = reatomMemo(() => {
  const emailFieldRef = useRef<HTMLInputElement | null>(null);

  useHandleErrors({ emailFieldRef });

  return (
    <AsyncFormDialog
      size={'sm'}
      form={registerForm}
      disclosure={registerDisclosure}
      initialFocusEl={() => emailFieldRef.current}
      errorRenderer={(error) => <FormError error={error} />}
      title={
        <Text>
          <Trans>Registration</Trans>
        </Text>
      }
      submitLabel={<Trans>Sign up</Trans>}
    >
      <Flex justifyContent={'space-between'} alignItems={'center'}>
        <SignInLink />

        <CapsLockWarn />
      </Flex>

      <Flex gap={5} flex={1}>
        <NameField />

        <UsernameField />
      </Flex>

      <EmailField inputRef={emailFieldRef} />

      <PasswordField />
    </AsyncFormDialog>
  );
}, 'DesktopRegisterDialog');
