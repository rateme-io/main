import { Flex } from '@chakra-ui/react/flex';
import { Trans } from '@lingui/react/macro';

import { Avatar } from '@/features/avatar';
import { LanguageSelect } from '@/features/language-select';
import { loginDisclosure } from '@/features/login-dialog';
import { Search } from '@/features/search';
import { Button } from '@/shared/ui/button.tsx';
import { Link } from '@/shared/ui/link.tsx';
import { BigLogo } from '@/shared/ui/logo';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import { StatusGuard } from '@/shared/ui/status-guard.tsx';

import { CreateMenu } from './create-menu';
import { Menu } from './menu';

export const DesktopHeader = reatomMemo(({ ctx }) => {
  return (
    <>
      <Flex
        as={'header'}
        boxShadow={'xs'}
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
        </PageLayout>
      </Flex>
    </>
  );
}, 'DesktopHeader');
