import { FunctionComponent } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { DesktopRegisterDialog } from './ui/desktop';
import { MobileRegisterDialog } from './ui/mobile';

export const RegisterDialog: FunctionComponent = (props) => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileRegisterDialog {...props} />;
    case 'desktop':
      return <DesktopRegisterDialog {...props} />;
  }
};
