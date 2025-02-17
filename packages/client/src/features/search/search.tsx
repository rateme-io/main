import { lazy } from 'react';

import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import { ResponsiveContainer } from '@/shared/ui/responsive-container.tsx';

const SmallSearch = lazy(() =>
  import('./ui/small.tsx').then((module) => ({
    default: module.SmallSearch,
  })),
);
const BigSearch = lazy(() =>
  import('./ui/big.tsx').then((module) => ({
    default: module.BigSearch,
  })),
);

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
