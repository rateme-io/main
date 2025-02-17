import { Flex } from '@chakra-ui/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Dialogs } from '@/app/dialogs.tsx';
import { AppOverlay } from '@/shared/ui/app-overlay.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo';
import { Header } from '@/widgets/header';

const Root = reatomMemo(() => {
  return (
    <>
      <Dialogs />

      <AppOverlay />

      <Header />

      <Flex
        as={'main'}
        flexDirection={'column'}
        position={'relative'}
        zIndex={5}
        flex={1}
        overflow={'hidden'}
      >
        <Outlet />
      </Flex>
    </>
  );
}, 'Root');

export const Route = createRootRoute({
  component: Root,
  pendingComponent: () => 'pending',
  errorComponent: ({ error }) => {
    return <div>error: {error.message}</div>;
  },
});
