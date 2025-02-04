import { action, atom } from '@reatom/framework';
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

export type BoardTabs = 'builder' | 'preview';

export const $activeTab = atom<BoardTabs>('builder', '$activeTab');

export const $isPreviewTabActive = atom(
  (ctx) => ctx.spy($activeTab) === 'preview',
  '$isPreviewTabActive',
);
