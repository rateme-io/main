import { Box } from '@chakra-ui/react';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { FunctionComponent } from 'react';

import { Header } from '@/widgets/header';

const Root: FunctionComponent = () => {
  return (
    <Box>
      <Header />
      <main>
        <Outlet />
      </main>
    </Box>
  );
};

export const Route = createRootRoute({
  component: Root,
  errorComponent: () => <div>error</div>,
});
