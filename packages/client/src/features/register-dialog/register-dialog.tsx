import { createLazyBreakpointsSwitch } from '@/shared/ui/lazy-breakpoints-switch.tsx';

export const RegisterDialog = createLazyBreakpointsSwitch({
  desktop: () =>
    import('./ui/desktop.tsx').then((module) => ({
      default: module.DesktopRegisterDialog,
    })),
  mobile: () =>
    import('./ui/mobile.tsx').then((module) => ({
      default: module.MobileRegisterDialog,
    })),
});
