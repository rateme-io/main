import { lazy } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

const DesktopHeader = lazy(() =>
  import('./ui/desktop').then((module) => ({ default: module.DesktopHeader })),
);
const MobileHeader = lazy(() =>
  import('./ui/mobile').then((module) => ({ default: module.MobileHeader })),
);

export const Header = reatomMemo(() => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileHeader />;
    case 'desktop':
      return <DesktopHeader />;
  }
}, 'Header');
