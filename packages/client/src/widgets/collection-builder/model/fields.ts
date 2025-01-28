import { atom } from '@reatom/framework';

import {
  FieldBuilderConfig,
  InferFields,
  InferFieldTypes,
} from '@/shared/field-builder';
import { fieldBuilder } from '@/shared/field-builder/model.ts';

export const collectionFields = {
  group: {
    state: () => ({
      $name: atom('', 'group.$name'),
    }),
    hasChildren: true,
  },
  text: {
    state: () => ({
      $name: atom('', 'text.$name'),
    }),
  },
  numeric: {
    state: () => ({
      $name: atom('', 'numeric.$name'),
    }),
  },
  select: {
    state: () => ({
      $name: atom('', 'select.$name'),
      $options: atom([], 'select.$options'),
      $isMulti: atom(false, 'select.$isMulti'),
      $isCreatable: atom(false, 'select.$isCreatable'),
    }),
  },
  internalLink: {
    state: () => ({
      $name: atom('', 'internalLink.$name'),
      $collectionId: atom('', 'internalLink.$collectionId'),
    }),
  },
  link: {
    state: () => ({
      $name: atom('', 'link.$name'),
    }),
  },
  date: {
    state: () => ({
      $name: atom('', 'date.$name'),
      $format: atom('DD/MM/YYYY', 'date.$format'),
    }),
  },
  duration: {
    state: () => ({
      $name: atom('', 'duration.$name'),
    }),
  },
  images: {
    state: () => ({
      $name: atom('', 'image.$name'),
    }),
  },
} satisfies FieldBuilderConfig;

export const collectionBuilder = fieldBuilder(collectionFields, {
  name: 'collection',
});

export type CollectionFields = InferFields<typeof collectionFields>;
export type CollectionTypes = InferFieldTypes<typeof collectionFields>;
