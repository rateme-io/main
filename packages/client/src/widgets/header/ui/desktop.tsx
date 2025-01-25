import { Box } from '@chakra-ui/react/box';
import { Flex } from '@chakra-ui/react/flex';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';

import { Avatar } from '@/features/avatar';
import { LanguageSelect } from '@/features/language-select';
import { Search } from '@/features/search';
import { Button } from '@/shared/ui/button.tsx';
import { Link } from '@/shared/ui/link.tsx';
import { BigLogo } from '@/shared/ui/logo';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { StatusGuard } from '@/shared/ui/status-guard.tsx';
import { loginDisclosure } from '@/widgets/login-dialog';

import { CreateMenu } from './create-menu';
import { Menu } from './menu';

export const DesktopHeader = reatomComponent(({ ctx }) => {
  return (
    <>
      <Box as={'header'} boxShadow={'xs'} height={'60px'}>
        <PageLayout>
          <Flex
            paddingBlock={2}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={2}
          >
            <Flex
              alignItems={'center'}
              as={'nav'}
              gap={8}
              flex={1}
              containerType={'inline-size'}
            >
              <Link to={'/'}>
                <BigLogo />
              </Link>

              <Search />

              <StatusGuard status={'authorized'}>
                <Menu />
              </StatusGuard>
            </Flex>

            <Flex alignItems={'center'} gap={2}>
              <StatusGuard status={'authorized'}>
                <CreateMenu />
              </StatusGuard>

              <LanguageSelect />

              <StatusGuard status={'unauthorized'}>
                <Button
                  variant={'ghost'}
                  onClick={() => {
                    loginDisclosure.open(ctx);
                  }}
                >
                  <Trans>Sign In</Trans>
                </Button>
              </StatusGuard>
              <StatusGuard status={'authorized'}>
                <Avatar />
              </StatusGuard>
            </Flex>
          </Flex>
        </PageLayout>
      </Box>
    </>
  );
}, 'DesktopHeader');
