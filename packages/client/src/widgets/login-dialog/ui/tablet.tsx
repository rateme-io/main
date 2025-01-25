import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';

import { AsyncFormDialog } from '@/shared/ui/async-form-dialog.tsx';

import { loginDisclosure, loginForm } from '../model';
import { EmailField, FormError, PasswordField } from './common';

export const TabletLoginDialog = reatomComponent(() => {
  return (
    <AsyncFormDialog
      size={'sm'}
      form={loginForm}
      disclosure={loginDisclosure}
      errorRenderer={(error) => <FormError error={error} />}
      title={
        <Text>
          <Trans>Authorisation</Trans>
        </Text>
      }
      submitLabel={<Trans>Submit</Trans>}
    >
      <EmailField />

      <PasswordField />
    </AsyncFormDialog>
  );
}, 'TabletLoginDialog');
