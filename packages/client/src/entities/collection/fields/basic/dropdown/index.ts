import { createField } from '@/shared/field-builder/field';
import { createBuilder } from '@/shared/field-builder/field/builder';
import { createPreview } from '@/shared/field-builder/field/preview';

import { DropdownFieldBuilderModel, DropdownFieldPreviewModel } from './model';
import { DropdownFieldBuilderUI, DropdownFieldPreviewUI } from './ui';

const DropdownFieldBuilder = createBuilder({
  model: DropdownFieldBuilderModel,
  ui: DropdownFieldBuilderUI,
});

const DropdownFieldPreview = createPreview({
  model: DropdownFieldPreviewModel,
  ui: DropdownFieldPreviewUI,
});

export const DropdownField = createField({
  name: 'DropdownField',
  builder: DropdownFieldBuilder,
  preview: DropdownFieldPreview,
});
