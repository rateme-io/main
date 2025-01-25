import { FunctionComponent } from 'react';

import { LoginDialog } from '@/widgets/login-dialog';
import { RegisterDialog } from '@/widgets/register-dialog';

export const Dialogs: FunctionComponent = () => {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
    </>
  );
};
