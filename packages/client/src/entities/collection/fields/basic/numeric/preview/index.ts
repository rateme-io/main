import { createPreview } from '@/shared/field-builder/field/preview';

import { NumericFieldPreviewModel } from './model';
import { NumericFieldPreviewUI } from './ui';

export const NumericFieldPreview = createPreview({
  model: NumericFieldPreviewModel,
  ui: NumericFieldPreviewUI,
});
