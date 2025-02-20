import { createContext, use } from 'react';

import { BoardNode } from '../../model';

export type FieldContextInterface<
  BuilderState = unknown,
  PreviewState = unknown,
> = {
  node: BoardNode<BuilderState, PreviewState>;
};

export const FieldContext = createContext<FieldContextInterface | null>(null);

export const useFieldContext = <BuilderState, PreviewState>() => {
  const context = use(FieldContext);

  if (!context) {
    throw new Error(
      'useFieldContext must be used within a FieldContextProvider',
    );
  }

  return context as FieldContextInterface<BuilderState, PreviewState>;
};
