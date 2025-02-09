import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import { ResponsiveContainer } from '@/shared/ui/responsive-container.tsx';

import { BigSearch } from './ui/big';
import { SmallSearch } from './ui/small';

export const Search = reatomMemo(() => {
  const breakpoint = useBreakpoint();

  if (breakpoint === 'mobile') {
    return (
      <>
        <ResponsiveContainer
          maxWidth="300px"
          containerProps={{ maxWidth: 'lg' }}
        >
          <BigSearch />
        </ResponsiveContainer>
        <ResponsiveContainer
          minWidth="300px"
          containerProps={{ maxWidth: 'lg' }}
        >
          <SmallSearch />
        </ResponsiveContainer>
      </>
    );
  }

  return (
    <>
      <ResponsiveContainer maxWidth="800px" containerProps={{ maxWidth: 'lg' }}>
        <BigSearch />
      </ResponsiveContainer>
      <ResponsiveContainer minWidth="800px" containerProps={{ maxWidth: 'lg' }}>
        <SmallSearch />
      </ResponsiveContainer>
    </>
  );
}, 'Search');
