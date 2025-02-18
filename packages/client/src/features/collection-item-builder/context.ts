import { createContext, use } from 'react';

import { FieldBuilderModel } from '@/shared/field-builder/manager';

import { CollectionItemBuilderModel } from './model.ts';

export interface CollectionItemBuilderContextInterface {
  fields: FieldBuilderModel;
  model: CollectionItemBuilderModel;
}

export const CollectionItemBuilderContext =
  createContext<CollectionItemBuilderContextInterface | null>(null);

export const useCollectionItemBuilder = () => {
  const context = use(CollectionItemBuilderContext);

  if (!context) {
    throw new Error(
      'useCollectionItemBuilder must be used within a CollectionItemBuilderContext',
    );
  }

  return context;
};
