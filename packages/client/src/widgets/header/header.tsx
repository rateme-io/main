import { Box, Flex } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useAtom } from '@reatom/npm-react';
import { FunctionComponent } from 'react';

import { LanguageSelect } from '@/features/language-select';
import { LoginDialog } from '@/features/login-dialog/login-dialog.tsx';
import { Button } from '@/shared/ui/button.tsx';
import { Link } from '@/shared/ui/link';
import { BigLogo } from '@/shared/ui/logo';

export type HeaderProps = {};

export const Header: FunctionComponent<HeaderProps> = () => {
  const [isOpened, setIsOpened] = useAtom(true);

  return (
    <>
      <Box as={'header'} borderBottomWidth={1}>
        <Box
          width={'100%'}
          maxWidth={'8xl'}
          paddingInline={6}
          marginInline={'auto'}
        >
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
            </Flex>

            <Flex alignItems={'center'} gap={2}>
              <LanguageSelect />
              <Button
                variant={'ghost'}
                onClick={() => {
                  setIsOpened(true);
                }}
              >
                <Trans>Sign In</Trans>
              </Button>
            </Flex>
          </Flex>
        </Box>
      </Box>

      <LoginDialog
        isOpened={isOpened}
        onClose={() => {
          setIsOpened(false);
        }}
      />
    </>
  );
};
