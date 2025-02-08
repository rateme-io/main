import { IconButton, Separator } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { LinkComponentProps } from '@tanstack/react-router';
import { PropsWithChildren } from 'react';
import { CgMenuLeft } from 'react-icons/cg';

import { disclosureAtom } from '@/shared/atoms/disclosure.atom.ts';
import {
  DrawerBackdrop,
  DrawerBody,
  DrawerCloseTrigger,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerRoot,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/ui/drawer';
import { Link } from '@/shared/ui/link.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

const menuDisclosure = disclosureAtom({ defaultIsOpened: false, name: 'menu' });

export const MobileMenu = reatomMemo(({ ctx }) => {
  return (
    <DrawerRoot
      placement={'start'}
      open={ctx.spy(menuDisclosure.$isOpened)}
      onOpenChange={({ open }) => {
        if (open) {
          menuDisclosure.open(ctx);
        } else {
          menuDisclosure.close(ctx);
        }
      }}
    >
      <DrawerBackdrop />
      <DrawerTrigger asChild>
        <IconButton variant={'ghost'}>
          <CgMenuLeft />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerCloseTrigger>
          <IconButton variant={'ghost'}>
            <CgMenuLeft />
          </IconButton>
        </DrawerCloseTrigger>
        <DrawerHeader>
          <DrawerTitle />
        </DrawerHeader>
        <DrawerBody display={'flex'} flexDirection={'column'} gap={1}>
          <MenuLink to={'/'}>
            <Trans>Discover</Trans>
          </MenuLink>
          <MenuLink to={'/collections'}>
            <Trans>Collections</Trans>
          </MenuLink>
          <MenuLink to={'/rating-systems'}>
            <Trans>Rating systems</Trans>
          </MenuLink>

          <Separator />

          <MenuLink to={'/create-collection-item'}>
            <Trans>Add Collection Item</Trans>
          </MenuLink>

          <MenuLink to={'/rate-collection-item'}>
            <Trans>Rate collection item</Trans>
          </MenuLink>

          <Separator />

          <MenuLink to={'/create-collection'}>
            <Trans>New Collection</Trans>
          </MenuLink>

          <MenuLink to={'/create-rating-system'}>
            <Trans>New Rating System</Trans>
          </MenuLink>
        </DrawerBody>
        <DrawerFooter />
      </DrawerContent>
    </DrawerRoot>
  );
}, 'MobileMenu');

type MenuLinkProps = PropsWithChildren<{
  to: LinkComponentProps<'a'>['to'];
}>;

const MenuLink = reatomMemo<MenuLinkProps>(({ ctx, to, children }) => {
  return (
    <Link
      to={to}
      onClick={() => {
        menuDisclosure.close(ctx);
      }}
      padding={2}
      activeProps={{
        backgroundColor: 'bg.emphasized',
        borderRadius: 'md',
      }}
    >
      {children}
    </Link>
  );
}, 'MenuLink');
