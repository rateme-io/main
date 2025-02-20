import { createBuilder } from '@/shared/field-builder/field/builder';

import { NumericFieldBuilderModel } from './model';
import { NumericFieldBuilderUI } from './ui';

export const NumericFieldBuilder = createBuilder({
  model: NumericFieldBuilderModel,
  ui: NumericFieldBuilderUI,
}); 