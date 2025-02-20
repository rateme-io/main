import { createPreview } from '@/shared/field-builder/field/preview';

import { DropdownFieldPreviewModel } from './model';
import { DropdownFieldPreviewUI } from './ui';

export const DropdownFieldPreview = createPreview({
  model: DropdownFieldPreviewModel,
  ui: DropdownFieldPreviewUI,
});
