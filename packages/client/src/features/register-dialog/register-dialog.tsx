import { FunctionComponent, lazy } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

const MobileRegisterDialog = lazy(() =>
  import('./ui/mobile.tsx').then((module) => ({
    default: module.MobileRegisterDialog,
  })),
);
const DesktopRegisterDialog = lazy(() =>
  import('./ui/desktop.tsx').then((module) => ({
    default: module.DesktopRegisterDialog,
  })),
);

export const RegisterDialog: FunctionComponent = (props) => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileRegisterDialog {...props} />;
    case 'desktop':
      return <DesktopRegisterDialog {...props} />;
  }
};
