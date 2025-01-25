import { Flex } from '@chakra-ui/react/flex';
import { Trans } from '@lingui/react/macro';
import { LinkComponentProps } from '@tanstack/react-router';
import { FunctionComponent, PropsWithChildren } from 'react';

import { Link } from '@/shared/ui/link.tsx';

export const TabletMenu = () => {
  return (
    <Flex as={'nav'} gap={3}>
      <MenuLink to={'/'}>
        <Trans>Discover</Trans>
      </MenuLink>
      <MenuLink to={'/collections'}>
        <Trans>Collections</Trans>
      </MenuLink>
      <MenuLink to={'/rating-systems'}>
        <Trans>Rating systems</Trans>
      </MenuLink>
    </Flex>
  );
};

type MenuLinkProps = PropsWithChildren<{ to: LinkComponentProps<'a'>['to'] }>;

const MenuLink: FunctionComponent<MenuLinkProps> = ({ to, children }) => {
  return (
    <Link
      to={to}
      whiteSpace={'nowrap'}
      paddingInline={2}
      paddingBlock={1}
      activeProps={{
        backgroundColor: 'bg.emphasized',
        borderRadius: 'md',
      }}
    >
      {children}
    </Link>
  );
};
