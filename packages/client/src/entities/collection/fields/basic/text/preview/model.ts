import { createPreviewModel, InferPreviewState } from '@/shared/field-builder/field';

export const TextFieldPreviewModel = createPreviewModel({
  state: () => ({}),
});

export type TextFieldPreviewState = InferPreviewState<
  typeof TextFieldPreviewModel
>; 