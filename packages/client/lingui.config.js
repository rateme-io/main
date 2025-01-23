import { defineConfig } from '@lingui/cli';

export default defineConfig({
  sourceLocale: 'en',
  locales: ['en', 'ru'],
  catalogs: [
    {
      path: '<rootDir>/src/app/locales/{locale}/messages',
      include: ['src'],
    },
  ],
});
