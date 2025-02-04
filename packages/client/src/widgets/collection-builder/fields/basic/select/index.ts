import { createField } from '@/shared/field-builder/field';

import { DropdownFieldModel } from './model';
import { DropdownFieldUI } from './ui';

export const DropdownField = createField({
  name: 'DropdownField',
  model: DropdownFieldModel,
  ui: DropdownFieldUI,
});
