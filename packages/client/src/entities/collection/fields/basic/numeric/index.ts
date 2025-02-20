import { createField } from '@/shared/field-builder/field';

import { NumericFieldBuilder } from './builder';
import { NumericFieldPreview } from './preview';

export const NumericField = createField({
  name: 'NumericField',
  builder: NumericFieldBuilder,
  preview: NumericFieldPreview,
});
