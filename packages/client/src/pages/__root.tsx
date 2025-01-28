import { Flex } from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { Controllers } from '@/app/controllers.tsx';
import { Dialogs } from '@/app/dialogs.tsx';
import { AppOverlay } from '@/shared/ui/app-overlay.tsx';
import { Header } from '@/widgets/header';

const Root = reatomComponent(() => {
  return (
    <>
      <Controllers />
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
  errorComponent: ({ error }) => {
    return <div>error: {error.message}</div>;
  },
});
