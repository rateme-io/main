import { FunctionComponent } from 'react';
import { LoginDialog } from 'src/features/login-dialog';
import { RegisterDialog } from 'src/features/register-dialog';

export const Dialogs: FunctionComponent = () => {
  return (
    <>
      <LoginDialog />
      <RegisterDialog />
    </>
  );
};
