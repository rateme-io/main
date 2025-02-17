import { reatomContext } from '@reatom/npm-react';
import { FunctionComponent, PropsWithChildren, Suspense } from 'react';

import { AppLoader } from '@/shared/ui/app-overlay';

import { LocalesProvider } from './locales';
import { ctx } from './store';
import { ThemeProvider } from './theme';

export const Provider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <Suspense fallback={<AppLoader />}>
      <reatomContext.Provider value={ctx}>
        <ThemeProvider>
          <LocalesProvider>{children}</LocalesProvider>
        </ThemeProvider>
      </reatomContext.Provider>
    </Suspense>
  );
};
