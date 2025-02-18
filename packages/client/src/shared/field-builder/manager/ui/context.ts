import { createContext, use } from 'react';

import { FieldBuilderModel } from '@/shared/field-builder/manager/model';

export type FieldBuilderContextInterface = {
  model: FieldBuilderModel;
};

export const FieldBuilderContext = createContext<FieldBuilderContextInterface>(
  {} as never,
);

export const useFieldBuilderContext = () => use(FieldBuilderContext);
