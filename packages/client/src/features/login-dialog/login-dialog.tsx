import { createLazyBreakpointsSwitch } from '@/shared/ui/lazy-breakpoints-switch.tsx';

export const LoginDialog = createLazyBreakpointsSwitch({
  mobile: () =>
    import('./ui/mobile.tsx').then((module) => ({
      default: module.MobileLoginDialog,
    })),
  desktop: () =>
    import('./ui/desktop.tsx').then((module) => ({
      default: module.DesktopLoginDialog,
    })),
});
