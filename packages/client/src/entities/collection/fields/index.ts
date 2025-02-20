import { FieldBuilder } from '@/shared/field-builder/manager';

import { BasicFieldGroup } from './basic';

export const createFieldsBuilder = () =>
  FieldBuilder.createModel({
    groups: [BasicFieldGroup],
  });
