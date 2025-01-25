import { createListCollection, IconButton } from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';
import { MdTranslate } from 'react-icons/md';

import { defaultLocale, Locales, locales } from '@/app/locales';
import { $locale } from '@/shared/atoms/locale.atom.ts';

import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
} from './custom-selct.tsx';

const languageOptions = Object.entries(locales).map(([key, value]) => ({
  value: key as Locales,
  label: value,
}));

const languageCollection = createListCollection({
  items: languageOptions,
});

export const LanguageSelect = reatomComponent(({ ctx }) => {
  const locale = ctx.spy($locale);

  return (
    <SelectRoot
      width={'40px'}
      marginInline={2}
      collection={languageCollection}
      defaultValue={[locale.currentLocale ?? defaultLocale]}
      onValueChange={(value) => {
        return locale.changeLocale(value.value[0] as Locales);
      }}
    >
      <SelectTrigger
        display={'flex'}
        alignItems={'center'}
        buttonProps={{ padding: 0 }}
      >
        <IconButton as={'span'} variant={'ghost'}>
          <MdTranslate />
        </IconButton>
      </SelectTrigger>
      <SelectContent width={'100px'}>
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
}, 'LanguageSelect');
