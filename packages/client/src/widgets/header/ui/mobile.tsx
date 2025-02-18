import { IconButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { Flex } from '@chakra-ui/react/flex';
import { FiLogIn } from 'react-icons/fi';

import { Avatar } from '@/features/avatar';
import { LanguageSelect } from '@/features/language-select';
import { loginDisclosure } from '@/features/login-dialog';
import { Search } from '@/features/search';
import { Link } from '@/shared/ui/link.tsx';
import { VerySmallLogo } from '@/shared/ui/logo/very-small-logo.tsx';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import { StatusGuard } from '@/shared/ui/status-guard.tsx';

import { Menu } from './menu';

export const MobileHeader = reatomMemo(({ ctx }) => {
  return (
    <>
      <Box
        as={'header'}
        boxShadow={'xs'}
        borderBottomWidth={1}
        height={'60px'}
        position={'relative'}
        zIndex={10}
        backgroundColor={'bg'}
      >
        <PageLayout
          flexDirection={'row'}
          alignItems={'center'}
          paddingBlock={2}
          justifyContent={'space-between'}
          gap={2}
        >
          <Flex
            gap={2}
            flex={1}
            containerType={'inline-size'}
            alignItems={'center'}
          >
            <StatusGuard status={'authorized'}>
              <Menu />
            </StatusGuard>

            <Link to={'/'} marginRight={2}>
              <VerySmallLogo />
            </Link>

            <Search />
          </Flex>

          <Flex alignItems={'center'} gap={2}>
            <LanguageSelect />

            <StatusGuard status={'unauthorized'}>
              <IconButton
                variant={'ghost'}
                onClick={() => {
                  loginDisclosure.open(ctx);
                }}
              >
                <FiLogIn />
              </IconButton>
            </StatusGuard>
            <StatusGuard status={'authorized'}>
              <Avatar />
            </StatusGuard>
          </Flex>
        </PageLayout>
      </Box>
    </>
  );
}, 'MobileHeader');
