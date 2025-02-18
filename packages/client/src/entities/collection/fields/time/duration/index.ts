import { createField } from '@/shared/field-builder/field';

import { DurationFieldModel } from './model.ts';
import { DurationFieldUI } from './ui.tsx';

export const DurationField = createField({
  name: 'DurationField',
  model: DurationFieldModel,
  ui: DurationFieldUI,
});
