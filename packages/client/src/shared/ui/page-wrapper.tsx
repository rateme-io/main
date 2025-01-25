import { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { FunctionComponent, PropsWithChildren } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

export type PageWrapperProps = PropsWithChildren<BoxProps>;

export const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  children,
  ...props
}) => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'desktop':
      return (
        <Box {...props} paddingBlock={5}>
          {children}
        </Box>
      );
    case 'mobile':
      return (
        <Box {...props} paddingBlock={1}>
          {children}
        </Box>
      );
  }
};
