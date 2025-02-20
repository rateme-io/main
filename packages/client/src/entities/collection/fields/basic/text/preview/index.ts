import { createPreview } from '@/shared/field-builder/field/preview';

import { TextFieldPreviewModel } from './model';
import { TextFieldPreviewUI } from './ui';

export const TextFieldPreview = createPreview({
  model: TextFieldPreviewModel,
  ui: TextFieldPreviewUI,
}); 