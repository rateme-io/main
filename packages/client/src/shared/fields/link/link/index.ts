import { createField } from '@/shared/field-builder/field';

import { LinkFieldModel } from './model.ts';
import { LinkFieldUI } from './ui.tsx';

export const LinkField = createField({
  name: 'LinkField',
  model: LinkFieldModel,
  ui: LinkFieldUI,
});
