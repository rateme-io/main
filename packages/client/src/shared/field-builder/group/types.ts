import { ReactNode } from 'react';

import { Field } from '@/shared/field-builder/field';

export type CreateFieldGroupCommand = {
  name: string;
  title: ReactNode;
  icon: ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fields: Field<any, any>[];
};

export type FieldGroup = {
  id: string;
  title: ReactNode;
  icon: ReactNode;
  fields: Field<unknown, unknown>[];
};
