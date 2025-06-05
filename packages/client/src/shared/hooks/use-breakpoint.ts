import { useMediaQuery } from '@chakra-ui/react';

export const useBreakpoint = (): Breakpoints => {
  const [isGreaterThen900] = useMediaQuery(['(min-width: 900px)'], {
    fallback: [true],
    ssr: false,
  });

  if (isGreaterThen900) {
    return 'desktop';
  }

  return 'mobile';
};

export type Breakpoints = 'mobile' | 'desktop';

export const matchBreakpoint = (): Breakpoints => {
  const isGreaterThen900 = window.matchMedia('(min-width: 900px)');

  if (isGreaterThen900.matches) {
    return 'desktop';
  }

  return 'mobile';
}