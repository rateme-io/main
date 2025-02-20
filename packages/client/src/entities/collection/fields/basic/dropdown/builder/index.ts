import { createBuilder } from '@/shared/field-builder/field/builder';

import { DropdownFieldBuilderModel } from './model';
import { DropdownFieldBuilderUI } from './ui';

export const DropdownFieldBuilder = createBuilder({
  model: DropdownFieldBuilderModel,
  ui: DropdownFieldBuilderUI,
}); 