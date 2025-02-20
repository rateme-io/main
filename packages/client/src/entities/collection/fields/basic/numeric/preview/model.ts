import { atom } from '@reatom/framework';

import {
  createPreviewModel,
  InferPreviewState,
} from '@/shared/field-builder/field';

export const NumericFieldPreviewModel = createPreviewModel({
  state: () => ({
    $value: atom(0, 'state.$value'),
  }),
});

export type NumericFieldPreviewState = InferPreviewState<
  typeof NumericFieldPreviewModel
>;
