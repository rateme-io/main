import {
  createBuilderModel,
  InferBuilderState,
} from '@/shared/field-builder/field';

export const TextFieldBuilderModel = createBuilderModel({
  state: ({ $name }) => ({
    $name,
  }),
});

export type TextFieldBuilderState = InferBuilderState<
  typeof TextFieldBuilderModel
>;
