import { atom } from '@reatom/framework';

import {
  asyncChangeLocale,
  defaultLocale,
  Locales,
  locales,
} from '@/app/locales';

const $currentLanguage = atom(defaultLocale, '$currentLanguage');

export const $locale = atom(
  (ctx) => ({
    currentLocale: ctx.spy($currentLanguage),
    locales,
    defaultLocale,
    changeLocale: (nextLocale: Locales) => {
      $currentLanguage(ctx, nextLocale);

      return asyncChangeLocale(nextLocale);
    },
  }),
  '$locale',
);
