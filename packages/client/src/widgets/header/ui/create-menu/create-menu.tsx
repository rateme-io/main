import { useBreakpoint } from '@/shared/hooks/use-breakpoint';

import { CreateMenuDesktop } from './desktop.tsx';
import { CreateMenuMobile } from './mobile.tsx';

export const CreateMenu = () => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <CreateMenuMobile />;
    case 'desktop':
      return <CreateMenuDesktop />;
  }
};
