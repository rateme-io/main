import { FunctionComponent } from 'react';

import { Button, ButtonProps } from '@/shared/ui/button.tsx';

export const ButtonLink: FunctionComponent<ButtonProps> = (props) => {
  return (
    <Button
      variant={'ghost'}
      padding={0}
      margin={0}
      height={'auto'}
      width={'fit-content'}
      _hover={{
        textDecoration: 'underline',
        backgroundColor: 'transparent',
      }}
      {...props}
    />
  );
};
