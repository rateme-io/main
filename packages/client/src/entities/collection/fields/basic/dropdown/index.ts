import { createField } from '@/shared/field-builder/field';

import { DropdownFieldBuilder } from './builder';
import { DropdownFieldPreview } from './preview';

export const DropdownField = createField({
  name: 'DropdownField',
  builder: DropdownFieldBuilder,
  preview: DropdownFieldPreview,
});
