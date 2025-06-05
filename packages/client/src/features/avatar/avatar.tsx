import { createLazyBreakpointsSwitch } from '@/shared/ui/lazy-breakpoints-switch.tsx';

export const Avatar = createLazyBreakpointsSwitch({
  desktop: () =>
    import('./ui/desktop.tsx').then((module) => ({
      default: module.DesktopAvatar,
    })),
  mobile: () =>
    import('./ui/mobile.tsx').then((module) => ({
      default: module.MobileAvatar,
    })),
});
