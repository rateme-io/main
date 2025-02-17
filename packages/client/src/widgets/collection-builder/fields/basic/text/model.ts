import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const TextFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type TextFieldState = InferState<typeof TextFieldModel>;
