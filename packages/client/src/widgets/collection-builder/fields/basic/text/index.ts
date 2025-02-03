import { createField } from '@/shared/field-builder/field';

import { TextFieldModel } from './model';
import { TextFieldUI } from './ui';

export const TextField = createField({
  name: 'TextField',
  model: TextFieldModel,
  ui: TextFieldUI,
});
