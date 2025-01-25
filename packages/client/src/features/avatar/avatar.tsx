import { FunctionComponent } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { DesktopAvatar } from './ui/desktop';
import { MobileAvatar } from './ui/mobile';

export const Avatar: FunctionComponent = () => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'desktop':
      return <DesktopAvatar />;
    case 'mobile':
      return <MobileAvatar />;
  }
};
