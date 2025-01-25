import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { MobileMenu } from './mobile.tsx';
import { TabletMenu } from './tablet.tsx';

export const Menu = () => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileMenu />;
    case 'tablet':
      return <TabletMenu />;
  }
};
