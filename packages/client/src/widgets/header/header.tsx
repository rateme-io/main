import { reatomComponent } from '@reatom/npm-react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { DesktopHeader } from './ui/desktop';
import { MobileHeader } from './ui/mobile';

export const Header = reatomComponent(() => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileHeader />;
    case 'desktop':
      return <DesktopHeader />;
  }
}, 'Header');
