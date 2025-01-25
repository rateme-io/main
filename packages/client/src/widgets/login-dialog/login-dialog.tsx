import { FunctionComponent } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { MobileLoginDialog } from './ui/mobile';
import { TabletLoginDialog } from './ui/tablet';

export const LoginDialog: FunctionComponent = (props) => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileLoginDialog {...props} />;
    case 'tablet':
      return <TabletLoginDialog {...props} />;
  }
};
