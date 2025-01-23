import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { FunctionComponent, PropsWithChildren, useEffect } from 'react';

import { asyncChangeLocale, defaultLocale } from './utils';

export const LocalesProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  useEffect(() => {
    asyncChangeLocale(defaultLocale);
  }, []);

  return <I18nProvider i18n={i18n}>{children}</I18nProvider>;
};
