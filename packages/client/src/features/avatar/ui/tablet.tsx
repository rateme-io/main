import { HStack, Stack, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { FaRegUser } from 'react-icons/fa6';
import { FiLogOut } from 'react-icons/fi';
import { IoSettingsOutline } from 'react-icons/io5';

import { $session, logoutAction } from '@/entities/session';
import { Avatar } from '@/shared/ui/avatar.tsx';
import { Link } from '@/shared/ui/link.tsx';
import { MenuContent, MenuItem, MenuRoot, MenuTrigger } from '@/shared/ui/menu';

export const TabletAvatar = reatomComponent(({ ctx }) => {
  const { user } = ctx.spy($session);

  return (
    <MenuRoot>
      <MenuTrigger>
        <HStack gap="4" cursor={'pointer'}>
          <Avatar
            name={user.name.getValue()}
            src={user.logoUrl.getValue() ?? undefined}
          />
          <Stack gap="0" align={'flex-start'}>
            <Text fontWeight="medium">{user.name.getValue()}</Text>
            <Text color="fg.muted" textStyle="sm">
              @{user.username.getValue()}
            </Text>
          </Stack>
        </HStack>
      </MenuTrigger>
      <MenuContent>
        <MenuItem asChild value={'profile'} cursor={'pointer'}>
          <Link to={'/'}>
            <FaRegUser />
            <Trans>Profile</Trans>
          </Link>
        </MenuItem>
        <MenuItem asChild value={'settings'} cursor={'pointer'}>
          <Link to={'/'}>
            <IoSettingsOutline />
            <Trans>Settings</Trans>
          </Link>
        </MenuItem>
        <MenuItem
          value={'logout'}
          cursor={'pointer'}
          onClick={() => {
            logoutAction(ctx);
          }}
        >
          <FiLogOut />
          <Trans>Logout</Trans>
        </MenuItem>
      </MenuContent>
    </MenuRoot>
  );
}, 'TabletAvatar');
