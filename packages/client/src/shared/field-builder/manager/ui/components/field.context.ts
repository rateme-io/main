import { createContext, useContext } from 'react';

import { BoardNode } from '@/shared/field-builder/manager';

export type FieldContextInterface = {
  node: BoardNode;
};

export const FieldContext = createContext<FieldContextInterface | null>(null);

export const useFieldContext = () => {
  const context = useContext(FieldContext);

  if (!context) {
    throw new Error(
      'useFieldContext must be used within a FieldContextProvider',
    );
  }

  return context;
};
