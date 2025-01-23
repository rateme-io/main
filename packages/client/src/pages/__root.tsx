import { Box } from '@chakra-ui/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { FunctionComponent } from 'react';

import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { Header } from '@/widgets/header';

const Root: FunctionComponent = () => {
  return (
    <Box>
      <Header />
      <main>
        <PageLayout>
          <Outlet />
        </PageLayout>
      </main>
    </Box>
  );
};

export const Route = createRootRoute({
  component: Root,
  errorComponent: () => <div>error</div>,
});
