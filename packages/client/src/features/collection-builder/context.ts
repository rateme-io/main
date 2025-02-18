import { createContext, use } from 'react';

import { CollectionBuilderModel } from './model';

export interface CollectionBuilderContextInterface {
  model: CollectionBuilderModel;
}

export const CollectionBuilderContext =
  createContext<CollectionBuilderContextInterface | null>(null);

export const useCollectionBuilderContext = () => {
  const context = use(CollectionBuilderContext);

  if (!context) {
    throw new Error('CollectionBuilderContext is not provided');
  }

  return context;
};
