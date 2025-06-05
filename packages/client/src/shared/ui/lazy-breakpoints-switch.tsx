import { ComponentType } from 'react';

import { Breakpoints, matchBreakpoint, useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';
import { createLazySwitch } from '@/shared/ui/lazy-switch.tsx';

export const createLazyBreakpointsSwitch = (
  mappings: Record<
    Breakpoints,
    () => Promise<{ default: ComponentType<object> }>
  >,
) => {
  const LazyComponent = createLazySwitch(mappings, matchBreakpoint());

  return function LazyBreakpointsSwitch() {
    const breakpoint = useBreakpoint();

    return <LazyComponent id={breakpoint} />;
  };
};
