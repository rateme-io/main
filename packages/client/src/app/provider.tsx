import { reatomContext } from '@reatom/npm-react';
import { FunctionComponent, PropsWithChildren } from 'react';

import { LocalesProvider } from './locales';
import { ctx } from './store';
import { ThemeProvider } from './theme';

export const Provider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  return (
    <reatomContext.Provider value={ctx}>
      <ThemeProvider>
        <LocalesProvider>{children}</LocalesProvider>
      </ThemeProvider>
    </reatomContext.Provider>
  );
};
