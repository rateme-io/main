import { atom } from '@reatom/framework';

import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const NumericFieldModel = createFieldModel({
  state: ({ $name }) => ({
    $name,
    min: {
      $value: atom<number | null>(null, 'min.$value'),
      $enabled: atom(false, 'min.$enabled'),
    },
    max: {
      $value: atom<number | null>(null, 'max.$value'),
      $enabled: atom(false, 'max.$enabled'),
    },
  }),
});

export type NumericFieldState = InferState<typeof NumericFieldModel>;
