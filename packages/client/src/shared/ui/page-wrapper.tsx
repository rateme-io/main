import { Flex, FlexProps } from '@chakra-ui/react';
import { FunctionComponent, PropsWithChildren } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

export type PageWrapperProps = PropsWithChildren<FlexProps>;

export const PageWrapper: FunctionComponent<PageWrapperProps> = ({
  children,
  ...props
}) => {
  const breakpoint = useBreakpoint();

  switch (breakpoint) {
    case 'desktop':
      return (
        <Flex {...props} flex={1} overflow={'hidden'} paddingBlock={3}>
          {children}
        </Flex>
      );
    case 'mobile':
      return (
        <Flex {...props} flex={1} overflow={'hidden'} paddingBlock={1}>
          {children}
        </Flex>
      );
  }
};
