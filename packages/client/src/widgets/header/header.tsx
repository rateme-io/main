import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { DesktopHeader } from './ui/desktop';
import { MobileHeader } from './ui/mobile';

export const Header = reatomMemo(() => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'mobile':
      return <MobileHeader />;
    case 'desktop':
      return <DesktopHeader />;
  }
}, 'Header');
