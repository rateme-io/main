import {
  Link as ChakraLink,
  LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import { Link as RouterLink, LinkComponentProps } from '@tanstack/react-router';
import { FunctionComponent, PropsWithChildren } from 'react';

export type LinkProps = PropsWithChildren<{
  routerProps: LinkComponentProps<'a'>;
  elementProps?: ChakraLinkProps;
}>;

export const Link: FunctionComponent<LinkProps> = ({
  routerProps,
  elementProps,
  children,
}) => {
  return (
    <ChakraLink {...elementProps} asChild>
      <RouterLink {...routerProps}>{children}</RouterLink>
    </ChakraLink>
  );
};
