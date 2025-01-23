import { createListCollection } from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';
import { MdTranslate } from 'react-icons/md';

import { Locales, locales } from '@/app/locales';
import { $locale } from '@/shared/atoms/locale.atom.ts';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from './custom-selct.tsx';

export type LanguageSelectProps = {};

const languageOptions = Object.entries(locales).map(([key, value]) => ({
  value: key as Locales,
  label: value,
}));

const languageCollection = createListCollection({
  items: languageOptions,
});

export const LanguageSelect = reatomComponent<LanguageSelectProps>(
  ({ ctx }) => {
    const locale = ctx.spy($locale);

    return (
      <SelectRoot
        collection={languageCollection}
        onValueChange={(value) => {
          return locale.changeLocale(value.value[0] as Locales);
        }}
      >
        <SelectTrigger display={'flex'} alignItems={'center'}>
          <MdTranslate size={16} /> {locales[locale.currentLocale]}
        </SelectTrigger>
        <SelectContent>
          {languageCollection.items.map((item) => {
            return (
              <SelectItem key={item.value} item={item}>
                {item.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </SelectRoot>
    );
  },
);
