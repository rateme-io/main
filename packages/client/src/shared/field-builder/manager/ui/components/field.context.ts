import { createContext, use } from 'react';

import { BoardNode } from '../../model';

export type FieldContextInterface = {
  node: BoardNode;
};

export const FieldContext = createContext<FieldContextInterface | null>(null);

export const useFieldContext = () => {
  const context = use(FieldContext);

  if (!context) {
    throw new Error(
      'useFieldContext must be used within a FieldContextProvider',
    );
  }

  return context;
};
