import { reatomComponent } from '@reatom/npm-react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { MobileHeader } from './ui/mobile';
import { TabletHeader } from './ui/tablet';

export const Header = reatomComponent(() => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileHeader />;
    case 'tablet':
      return <TabletHeader />;
  }
}, 'Header');
