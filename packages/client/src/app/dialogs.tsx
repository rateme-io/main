import { FunctionComponent } from 'react';

import { LoginDialog } from '@/features/login-dialog';
import { RegisterDialog } from '@/features/register-dialog';

export const Dialogs: FunctionComponent = () => {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
    </>
  );
};
