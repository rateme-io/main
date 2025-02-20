import { createBuilderModel } from '@/shared/field-builder/field';
import { createPreviewModel } from '@/shared/field-builder/field';
import {
  InferBuilderState,
  InferPreviewState,
} from '@/shared/field-builder/field';

export const TextFieldBuilderModel = createBuilderModel({
  state: ({ $name }) => ({
    $name,
  }),
});

export const TextFieldPreviewModel = createPreviewModel({
  state: () => ({}),
});

export type TextFieldBuilderState = InferBuilderState<
  typeof TextFieldBuilderModel
>;
export type TextFieldPreviewState = InferPreviewState<
  typeof TextFieldPreviewModel
>;
