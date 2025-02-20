import { createPreviewUI } from '@/shared/field-builder/field/preview';

import { DropdownFieldPreviewState } from './model';

export const DropdownFieldPreviewUI = createPreviewUI<DropdownFieldPreviewState>({
  Preview: () => null,
}); 