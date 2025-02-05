import { createContext, useContext } from 'react';

import { FieldGroup } from '@/shared/field-builder/group';
import { FieldsManagerModel } from '@/shared/field-builder/manager/model';

export type FieldManagerContextInterface = {
  groups: FieldGroup[];
  model: FieldsManagerModel;
};

export const FieldsManagerContext = createContext<FieldManagerContextInterface>(
  {} as never,
);

export const useFieldsManagerContext = () => useContext(FieldsManagerContext);
