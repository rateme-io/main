import { Box } from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';
import { createRootRoute, Outlet } from '@tanstack/react-router';

import { AppOverlay } from '@/shared/ui/app-overlay.tsx';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { Header } from '@/widgets/header';

const Root = reatomComponent(() => {
  return (
    <Box>
      <AppOverlay />

      <Header />
      <main>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </main>
    </Box>
  );
}, 'Root');

export const Route = createRootRoute({
  component: Root,
  errorComponent: ({ error }) => {
    return <div>error: {error.message}</div>;
  },
});
