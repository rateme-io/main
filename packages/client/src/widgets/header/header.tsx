import { Box } from '@chakra-ui/react/box';
import { Flex } from '@chakra-ui/react/flex';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';

import { LanguageSelect } from '@/features/language-select';
import { LoginDialog } from '@/features/login-dialog/login-dialog.tsx';
import { Search } from '@/features/search';
import { disclosureAtom } from '@/shared/atoms/disclosure.atom.ts';
import { Button } from '@/shared/ui/button.tsx';
import { Link } from '@/shared/ui/link.tsx';
import { BigLogo } from '@/shared/ui/logo';
import { PageLayout } from '@/shared/ui/page-layout.tsx';

const loginDisclosure = disclosureAtom({ defaultIsOpened: false });

export const Header = reatomComponent(({ ctx }) => {
  return (
    <>
      <Box as={'header'} borderBottomWidth={1}>
        <PageLayout>
          <Flex
            paddingBlock={2}
            alignItems={'center'}
            justifyContent={'space-between'}
            gap={2}
          >
            <Flex alignItems={'center'} as={'nav'} gap={8}>
              <Link routerProps={{ to: '/' }}>
                <BigLogo />
              </Link>

              <Search />
            </Flex>

            <Flex alignItems={'center'} gap={2}>
              <LanguageSelect />
              <Button
                variant={'ghost'}
                onClick={() => {
                  loginDisclosure.open(ctx);
                }}
              >
                <Trans>Sign In</Trans>
              </Button>
            </Flex>
          </Flex>
        </PageLayout>
      </Box>

      <LoginDialog disclosure={loginDisclosure} />
    </>
  );
}, 'Header');
