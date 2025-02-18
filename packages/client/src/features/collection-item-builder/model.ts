import { action } from '@reatom/framework';
import { z } from 'zod';

import { fieldAtom } from '@/shared/atoms/field.atom.ts';
import { formAtom } from '@/shared/atoms/form.atom.ts';

export const createCollectionItemBuilderModel = () => {
  const nameField = fieldAtom({
    name: 'collection-item-name',
    defaultValue: '',
    schema: z.string().min(1),
  });

  const imageField = fieldAtom<File | null>({
    defaultValue: null,
    schema: z.instanceof(File).nullable(),
    name: 'collection-item-image',
  });

  const tagsField = fieldAtom<string[]>({
    defaultValue: [],
    schema: z.array(z.string()),
    name: 'collection-item-tags',
  });

  const form = formAtom({
    fields: {
      name: nameField,
      image: imageField,
      tags: tagsField,
    },
    name: 'collection-item-form',
    onSubmit: action(async (_ctx, values) => {
      console.log('Submit form', values);
    }, 'form.onSubmit'),
  });

  return {
    nameField,
    imageField,
    tagsField,
    form,
  };
};

export type CollectionItemBuilderModel = ReturnType<
  typeof createCollectionItemBuilderModel
>;
