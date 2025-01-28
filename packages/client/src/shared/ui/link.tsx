import { Link as ChakraLink } from '@chakra-ui/react';
import { createLink, LinkComponent } from '@tanstack/react-router';
import { ComponentPropsWithoutRef, forwardRef } from 'react';

type ChakraLinkProps = Omit<
  ComponentPropsWithoutRef<typeof ChakraLink>,
  'href'
>;

const ChakraLinkComponent = forwardRef<HTMLAnchorElement, ChakraLinkProps>(
  (props, ref) => {
    return <ChakraLink ref={ref} {...props} />;
  },
);
ChakraLinkComponent.displayName = 'ChakraLinkComponent';

const CreatedLinkComponent = createLink(ChakraLinkComponent);

export const Link: LinkComponent<typeof ChakraLinkComponent> = (props) => {
  return (
    <CreatedLinkComponent
      textDecoration={'none'}
      _hover={{ textDecoration: 'none' }}
      _focus={{ textDecoration: 'none' }}
      preload={'intent'}
      {...props}
    />
  );
};
