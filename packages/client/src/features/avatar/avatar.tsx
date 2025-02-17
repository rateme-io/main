import { FunctionComponent, lazy } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

const MobileAvatar = lazy(() =>
  import('./ui/mobile.tsx').then((module) => ({
    default: module.MobileAvatar,
  })),
);
const DesktopAvatar = lazy(() =>
  import('./ui/desktop.tsx').then((module) => ({
    default: module.DesktopAvatar,
  })),
);

export const Avatar: FunctionComponent = () => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'desktop':
      return <DesktopAvatar />;
    case 'mobile':
      return <MobileAvatar />;
  }
};
