import { createField } from '@/shared/field-builder/field';
import { createBuilder } from '@/shared/field-builder/field/builder';
import { createPreview } from '@/shared/field-builder/field/preview';

import { NumericFieldBuilderModel } from './builder/model';
import { NumericFieldBuilderUI } from './builder/ui';
import { NumericFieldPreviewModel } from './preview/model';
import { NumericFieldPreviewUI } from './preview/ui';

const NumericFieldBuilder = createBuilder({
  model: NumericFieldBuilderModel,
  ui: NumericFieldBuilderUI,
});

const NumericFieldPreview = createPreview({
  model: NumericFieldPreviewModel,
  ui: NumericFieldPreviewUI,
});

export const NumericField = createField({
  name: 'NumericField',
  builder: NumericFieldBuilder,
  preview: NumericFieldPreview,
});
