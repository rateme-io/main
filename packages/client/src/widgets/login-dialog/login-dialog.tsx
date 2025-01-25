import { FunctionComponent } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { DesktopLoginDialog } from './ui/desktop';
import { MobileLoginDialog } from './ui/mobile';

export const LoginDialog: FunctionComponent = (props) => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileLoginDialog {...props} />;
    case 'desktop':
      return <DesktopLoginDialog {...props} />;
  }
};
