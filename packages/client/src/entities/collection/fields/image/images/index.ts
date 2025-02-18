import { createField } from '@/shared/field-builder/field';

import { ImagesFieldModel } from './model.ts';
import { ImagesFieldUI } from './ui.tsx';

export const ImagesField = createField({
  name: 'ImagesField',
  model: ImagesFieldModel,
  ui: ImagesFieldUI,
});
