import { Flex, FlexProps } from '@chakra-ui/react';
import { FunctionComponent, PropsWithChildren } from 'react';

type ResponsiveContainerProps = PropsWithChildren<{
  minWidth?: string;
  maxWidth?: string;
  containerProps?: FlexProps;
}>;

export const ResponsiveContainer: FunctionComponent<
  ResponsiveContainerProps
> = ({ minWidth, maxWidth, children, containerProps = {} }) => {
  return (
    <Flex
      css={{
        ...(maxWidth && {
          [`@container(max-width: ${maxWidth})`]: {
            display: 'none',
          },
        }),
        ...(minWidth && {
          [`@container(min-width: ${minWidth})`]: {
            display: 'none',
          },
        }),
      }}
      {...containerProps}
    >
      {children}
    </Flex>
  );
};
