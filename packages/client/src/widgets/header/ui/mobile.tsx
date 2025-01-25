import { IconButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { Flex } from '@chakra-ui/react/flex';
import { reatomComponent } from '@reatom/npm-react';
import { FiLogIn } from 'react-icons/fi';

import { Avatar } from '@/features/avatar';
import { LanguageSelect } from '@/features/language-select';
import { Search } from '@/features/search';
import { Link } from '@/shared/ui/link.tsx';
import { SmallLogo } from '@/shared/ui/logo';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { StatusGuard } from '@/shared/ui/status-guard.tsx';
import { loginDisclosure } from '@/widgets/login-dialog';

import { Menu } from './menu';

export const MobileHeader = reatomComponent(({ ctx }) => {
  return (
    <>
      <Box as={'header'} borderBottomWidth={1} height={'60px'}>
        <PageLayout>
          <Flex
            paddingBlock={2}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={2}
          >
            <StatusGuard status={'unauthorized'}>
              <Link to={'/'}>
                <SmallLogo />
              </Link>
            </StatusGuard>
            <StatusGuard status={'authorized'}>
              <Menu />
            </StatusGuard>

            <Search />

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
