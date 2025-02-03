import { atom } from '@reatom/framework';

import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const TextFieldModel = createFieldModel({
  state: () => ({
    $name: atom('', 'state.$name'),
  }),
});

export type TextFieldState = InferState<typeof TextFieldModel>;
