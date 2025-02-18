import { FunctionComponent, lazy } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

const MobileLoginDialog = lazy(() =>
  import('./ui/mobile.tsx').then((module) => ({
    default: module.MobileLoginDialog,
  })),
);
const DesktopLoginDialog = lazy(() =>
  import('./ui/desktop.tsx').then((module) => ({
    default: module.DesktopLoginDialog,
  })),
);

export const LoginDialog: FunctionComponent = (props) => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileLoginDialog {...props} />;
    case 'desktop':
      return <DesktopLoginDialog {...props} />;
  }
};
