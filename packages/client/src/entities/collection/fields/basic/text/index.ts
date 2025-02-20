import { createField } from '@/shared/field-builder/field';

import { TextFieldBuilder } from './builder';
import { TextFieldPreview } from './preview';

export const TextField = createField({
  name: 'TextField',
  builder: TextFieldBuilder,
  preview: TextFieldPreview,
});
