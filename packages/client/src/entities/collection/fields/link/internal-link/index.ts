import { createField } from '@/shared/field-builder/field';

import { InternalLinkFieldModel } from './model.ts';
import { InternalLinkFieldUI } from './ui.tsx';

export const InternalLinkField = createField({
  name: 'InternalLinkField',
  model: InternalLinkFieldModel,
  ui: InternalLinkFieldUI,
});
