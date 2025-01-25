import { Link as ChakraLink } from '@chakra-ui/react';
import { createLink, LinkComponent } from '@tanstack/react-router';
import * as React from 'react';
import { forwardRef } from 'react';

interface ChakraLinkProps
  extends Omit<React.ComponentPropsWithoutRef<typeof ChakraLink>, 'href'> {}

const ChakraLinkComponent = React.forwardRef<
  HTMLAnchorElement,
  ChakraLinkProps
>((props, ref) => {
  return <ChakraLink ref={ref} {...props} />;
});

const CreatedLinkComponent = createLink(ChakraLinkComponent);

export const Link: LinkComponent<typeof ChakraLinkComponent> = forwardRef(
  (props, ref) => {
    return (
      <CreatedLinkComponent
        textDecoration={'none'}
        _hover={{ textDecoration: 'none' }}
        _focus={{ textDecoration: 'none' }}
        preload={'intent'}
        {...props}
        ref={ref}
      />
    );
  },
);
