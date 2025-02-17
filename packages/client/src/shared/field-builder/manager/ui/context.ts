import { createContext, use } from 'react';

import { FieldsManagerModel } from '@/shared/field-builder/manager/model';

export type FieldManagerContextInterface = {
  model: FieldsManagerModel;
};

export const FieldsManagerContext = createContext<FieldManagerContextInterface>(
  {} as never,
);

export const useFieldsManagerContext = () => use(FieldsManagerContext);
