import { reatomContext } from '@reatom/npm-react';
import { RouterProvider } from '@tanstack/react-router';
import { FunctionComponent } from 'react';

import { Controllers } from './controllers.tsx';
import { Dialogs } from './dialogs.tsx';
import { LocalesProvider } from './locales';
import { router } from './router';
import { ctx } from './store';
import { ThemeProvider } from './theme';

export const Provider: FunctionComponent = () => {
  return (
    <reatomContext.Provider value={ctx}>
      <ThemeProvider>
        <LocalesProvider>
          <Controllers />
          <Dialogs />
          <RouterProvider router={router} />
        </LocalesProvider>
      </ThemeProvider>
    </reatomContext.Provider>
  );
};
