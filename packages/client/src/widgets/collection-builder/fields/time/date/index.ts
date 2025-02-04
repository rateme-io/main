import { createField } from '@/shared/field-builder/field';

import { DateFieldModel } from './model.ts';
import { DateFieldUI } from './ui.tsx';

export const DateField = createField({
  name: 'DateField',
  model: DateFieldModel,
  ui: DateFieldUI,
});
