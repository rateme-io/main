import { useBreakpoint } from '@/shared/hooks/use-breakpoint.ts';
import { createLazySwitch } from '@/shared/ui/lazy-switch.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import { ResponsiveContainer } from '@/shared/ui/responsive-container.tsx';

const ResponsiveSearch = createLazySwitch({
  small: () =>
    import('./ui/small.tsx').then((module) => ({
      default: module.SmallSearch,
    })),
  big: () =>
    import('./ui/big.tsx').then((module) => ({
      default: module.BigSearch,
    })),
});

export const Search = reatomMemo(() => {
  const breakpoint = useBreakpoint();

  if (breakpoint === 'mobile') {
    return (
      <>
        <ResponsiveContainer
          maxWidth="300px"
          containerProps={{ maxWidth: 'lg' }}
        >
          <ResponsiveSearch id={'big'} />
        </ResponsiveContainer>
        <ResponsiveContainer
          minWidth="300px"
          containerProps={{ maxWidth: 'lg' }}
        >
          <ResponsiveSearch id={'small'} />
        </ResponsiveContainer>
      </>
    );
  }

  return (
    <>
      <ResponsiveContainer maxWidth="800px" containerProps={{ maxWidth: 'lg' }}>
        <ResponsiveSearch id={'big'} />
      </ResponsiveContainer>
      <ResponsiveContainer minWidth="800px" containerProps={{ maxWidth: 'lg' }}>
        <ResponsiveSearch id={'small'} />
      </ResponsiveContainer>
    </>
  );
}, 'Search');
