import { i18n } from '@lingui/core';

const LOCAL_STORAGE_LOCALE_KEY = 'locale';

export const asyncChangeLocale = async (locale: Locales) => {
  localStorage.setItem(LOCAL_STORAGE_LOCALE_KEY, locale);
  const { messages } = await import(`./${locale}/messages.ts`);

  i18n.load(locale, messages);
  i18n.activate(locale);
};

export const locales = {
  en: 'English',
  ru: 'Русский',
} as const;

export type Locales = keyof typeof locales;

const readDefaultLocale = (): Locales => {
  const localStorageLocale = localStorage.getItem(LOCAL_STORAGE_LOCALE_KEY);

  if (localStorageLocale && localStorageLocale in locales) {
    return localStorageLocale as Locales;
  }

  return 'en';
};

export const defaultLocale: Locales = readDefaultLocale();
