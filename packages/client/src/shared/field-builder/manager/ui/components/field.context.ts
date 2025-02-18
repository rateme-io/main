import { createContext, use } from 'react';

import { BoardNode } from '../../model';

export type FieldContextInterface<State = unknown> = {
  node: BoardNode<State>;
};

export const FieldContext = createContext<FieldContextInterface | null>(null);

export const useFieldContext = <State>() => {
  const context = use(FieldContext);

  if (!context) {
    throw new Error(
      'useFieldContext must be used within a FieldContextProvider',
    );
  }

  return context as FieldContextInterface<State>;
};
