import { useBreakpoint } from '@/shared/hooks/use-breakpoint';

import { CreateMenuMobile } from './mobile.tsx';
import { CreateMenuTablet } from './tablet.tsx';

export const CreateMenu = () => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <CreateMenuMobile />;
    case 'tablet':
      return <CreateMenuTablet />;
  }
};
