import { useMediaQuery } from '@chakra-ui/react';

export const useBreakpoint = (): Breakpoints => {
  const [isGreaterThen800] = useMediaQuery(['(min-width: 800px)'], {
    fallback: [true],
    ssr: false,
  });

  if (isGreaterThen800) {
    return 'tablet';
  }

  return 'mobile';
};

export type Breakpoints = 'mobile' | 'tablet';
