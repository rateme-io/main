import { Flex, IconButton, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { FaPlus } from 'react-icons/fa6';

import { Link } from '@/shared/ui/link.tsx';
import {
  MenuContent,
  MenuItem,
  MenuItemGroup,
  MenuRoot,
  MenuSeparator,
  MenuTrigger,
} from '@/shared/ui/menu';

export const CreateMenuDesktop = () => {
  return (
    <MenuRoot>
      <MenuTrigger asChild>
        <IconButton borderRadius={'full'} variant={'ghost'}>
          <FaPlus />
        </IconButton>
      </MenuTrigger>
      <MenuContent>
        <MenuItemGroup>
          <Flex padding={2}>
            <Text fontWeight={'semibold'} fontSize={'sm'}>
              <Trans>What do you want to create?</Trans>
            </Text>
          </Flex>
          <MenuItem asChild value={'create-collection-item'} cursor={'pointer'}>
            <Link to={'/create-collection-item'}>
              <Trans>Create collection item</Trans>
            </Link>
          </MenuItem>
          <MenuItem asChild value={'create-rating'} cursor={'pointer'}>
            <Link to={'/rate-collection-item'}>
              <Trans>Rate collection item</Trans>
            </Link>
          </MenuItem>
        </MenuItemGroup>
        <MenuSeparator />
        <MenuItemGroup>
          <MenuItem asChild value={'create-collection'} cursor={'pointer'}>
            <Link to={'/create-collection'}>
              <Trans>Create collection</Trans>
            </Link>
          </MenuItem>
          <MenuItem asChild value={'create-rating-system'} cursor={'pointer'}>
            <Link to={'/create-rating-system'}>
              <Trans>Create rating system</Trans>
            </Link>
          </MenuItem>
        </MenuItemGroup>
      </MenuContent>
    </MenuRoot>
  );
};
