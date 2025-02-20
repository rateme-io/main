import { createBuilder } from '@/shared/field-builder/field/builder';

import { TextFieldBuilderModel } from './model';
import { TextFieldBuilderUI } from './ui';

export const TextFieldBuilder = createBuilder({
  model: TextFieldBuilderModel,
  ui: TextFieldBuilderUI,
});
