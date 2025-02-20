import { atom } from '@reatom/framework';

import {
  createPreviewModel,
  InferPreviewState,
} from '@/shared/field-builder/field';

export type DropdownPreviewOption = {
  value: string;
  label: string;
};

export const DropdownFieldPreviewModel = createPreviewModel({
  state: () => ({
    $value: atom<DropdownPreviewOption[]>([], 'state.$value'),
  }),
});

export type DropdownFieldPreviewState = InferPreviewState<
  typeof DropdownFieldPreviewModel
>;
