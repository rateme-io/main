import { Flex } from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';

import { BigSearch } from './ui/big';
import { SmallSearch } from './ui/small';

export const Search = reatomComponent(() => {
  const breakpoint = useBreakpoint();

  if (breakpoint === 'mobile') {
    return (
      <>
        <Flex
          maxWidth={'lg'}
          css={{
            '@container(max-width: 300px)': {
              display: 'none',
            },
          }}
        >
          <BigSearch />
        </Flex>
        <Flex
          maxWidth={'lg'}
          css={{
            '@container(min-width: 300px)': {
              display: 'none',
            },
          }}
        >
          <SmallSearch />
        </Flex>
      </>
    );
  }

  return (
    <>
      <Flex
        maxWidth={'lg'}
        css={{
          '@container(max-width: 800px)': {
            display: 'none',
          },
        }}
      >
        <BigSearch />
      </Flex>
      <Flex
        maxWidth={'lg'}
        css={{
          '@container(min-width: 800px)': {
            display: 'none',
          },
        }}
      >
        <SmallSearch />
      </Flex>
    </>
  );
}, 'Search');
