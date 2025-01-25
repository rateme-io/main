import { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { FunctionComponent } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

export const PageLayout: FunctionComponent<BoxProps> = (props) => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'tablet':
      return (
        <Box
          {...props}
          width={'100%'}
          height={'100%'}
          maxWidth={'8xl'}
          paddingInline={6}
          marginInline={'auto'}
        />
      );
    case 'mobile':
      return (
        <Box
          {...props}
          width={'100%'}
          height={'100%'}
          maxWidth={'8xl'}
          paddingInline={3}
          marginInline={'auto'}
        />
      );
  }
};
