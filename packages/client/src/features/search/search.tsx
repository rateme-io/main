import { Flex } from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { BigSearch } from './ui/big';
import { SmallSearch } from './ui/small';

export const Search = reatomComponent(() => {
  const breakpoint = useBreakpoint();

  if (breakpoint === 'mobile') {
    return <BigSearch />;
  }

  return (
    <>
      <Flex
        flex={'1'}
        maxWidth={'lg'}
        css={{
          '@container(max-width: 600px)': {
            display: 'none',
          },
        }}
      >
        <BigSearch />
      </Flex>
      <Flex
        maxWidth={'lg'}
        css={{
          '@container(min-width: 600px)': {
            display: 'none',
          },
        }}
      >
        <SmallSearch />
      </Flex>
    </>
  );
}, 'Search');
