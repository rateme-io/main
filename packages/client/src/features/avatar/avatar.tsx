import { FunctionComponent } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { MobileAvatar } from './ui/mobile';
import { TabletAvatar } from './ui/tablet';

export const Avatar: FunctionComponent = () => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'tablet':
      return <TabletAvatar />;
    case 'mobile':
      return <MobileAvatar />;
  }
};
