import { Flex, FlexProps } from '@chakra-ui/react';
import { FunctionComponent } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

export const PageLayout: FunctionComponent<FlexProps> = (props) => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'desktop':
      return (
        <Flex
          {...props}
          flex={1}
          maxWidth={'8xl'}
          paddingInline={5}
          marginInline={'auto'}
        />
      );
    case 'mobile':
      return (
        <Flex
          {...props}
          flex={1}
          maxWidth={'8xl'}
          paddingInline={2}
          marginInline={'auto'}
        />
      );
  }
};
