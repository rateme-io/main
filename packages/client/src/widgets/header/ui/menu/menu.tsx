import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { DesktopMenu } from './desktop.tsx';
import { MobileMenu } from './mobile.tsx';

export const Menu = () => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileMenu />;
    case 'desktop':
      return <DesktopMenu />;
  }
};
