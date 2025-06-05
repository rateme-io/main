import { createLazyBreakpointsSwitch } from '@/shared/ui/lazy-breakpoints-switch.tsx';

export const Header = createLazyBreakpointsSwitch({
  desktop: () =>
    import('./ui/desktop').then((module) => ({
      default: module.DesktopHeader,
    })),
  mobile: () =>
    import('./ui/mobile').then((module) => ({ default: module.MobileHeader })),
});
