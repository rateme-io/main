import {
  action,
  atom,
  reatomBoolean,
  withAssign,
  withComputed,
} from '@reatom/framework';
import { z } from 'zod';

import { fieldAtom } from '@/shared/atoms/field.atom.ts';
import { formAtom } from '@/shared/atoms/form.atom.ts';

export const collectionNameField = fieldAtom({
  defaultValue: '',
  schema: z.string().min(3),
  name: 'collection-name',
});

export const MAX_FILE_SIZE = 10 * 1024 * 1024;

export const collectionImageField = fieldAtom<File | null>({
  defaultValue: null,
  schema: z.instanceof(File).nullable(),
  name: 'collection-image',
});

export const collectionTagsField = fieldAtom<string[]>({
  defaultValue: [],
  schema: z.array(z.string()),
  name: 'collection-tags',
});

export const collectionForm = formAtom({
  fields: {
    name: collectionNameField,
    image: collectionImageField,
    tags: collectionTagsField,
  },
  name: 'collection-form',
  onSubmit: action(async (_ctx, values) => {
    console.log('Submit form', values);
  }, 'collectionForm.onSubmit'),
});

export const $step = atom(0, '$step').pipe(
  withAssign((target, name) => ({
    next: action((ctx) => target(ctx, ctx.get(target) + 1), `${name}.next`),
    prev: action((ctx) => target(ctx, ctx.get(target) - 1), `${name}.prev`),
  })),
);

export const $menuIsHidden = atom((ctx) => {
  return ctx.spy($step) !== 0;
}, '$menuIsHidden');

export const $menuIsOpened = reatomBoolean(true, '$menuIsOpened').pipe(
  withComputed((ctx) => {
    return !ctx.spy($menuIsHidden);
  }),
);
