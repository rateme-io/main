import { createField } from '@/shared/field-builder/field';
import { createBuilder } from '@/shared/field-builder/field/builder';
import { createPreview } from '@/shared/field-builder/field/preview';

import { TextFieldBuilderModel, TextFieldPreviewModel } from './model';
import { TextFieldBuilderUI, TextFieldPreviewUI } from './ui';

const TextFieldBuilder = createBuilder({
  model: TextFieldBuilderModel,
  ui: TextFieldBuilderUI,
});

const TextFieldPreview = createPreview({
  model: TextFieldPreviewModel,
  ui: TextFieldPreviewUI,
});

export const TextField = createField({
  name: 'TextField',
  builder: TextFieldBuilder,
  preview: TextFieldPreview,
});
