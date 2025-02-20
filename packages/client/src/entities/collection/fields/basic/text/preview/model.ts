import { atom } from '@reatom/framework';

import {
  createPreviewModel,
  InferPreviewState,
} from '@/shared/field-builder/field';

export const TextFieldPreviewModel = createPreviewModel({
  state: () => ({
    $value: atom('', 'state.$value'),
  }),
});

export type TextFieldPreviewState = InferPreviewState<
  typeof TextFieldPreviewModel
>;
