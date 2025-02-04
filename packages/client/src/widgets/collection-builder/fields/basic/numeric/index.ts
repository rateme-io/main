import { createField } from '@/shared/field-builder/field';

import { NumericFieldModel } from './model';
import { NumericFieldUI } from './ui';

export const NumericField = createField({
  name: 'NumericField',
  model: NumericFieldModel,
  ui: NumericFieldUI,
});
