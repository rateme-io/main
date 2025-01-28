import { z } from 'zod';

import { fieldAtom } from '@/shared/atoms/field.atom.ts';

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
