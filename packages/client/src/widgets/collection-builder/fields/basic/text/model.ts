import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const TextFieldModel = createFieldModel({
  state: ({ $name }) => ({
    $name,
  }),
});

export type TextFieldState = InferState<typeof TextFieldModel>;
