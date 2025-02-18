import {
  createFieldModel,
  InferBuilderState,
} from '@/shared/field-builder/field';

export const TextFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type TextFieldState = InferBuilderState<typeof TextFieldModel>;
