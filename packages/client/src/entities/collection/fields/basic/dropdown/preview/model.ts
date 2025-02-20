import {
  createPreviewModel,
  InferPreviewState,
} from '@/shared/field-builder/field';

export const DropdownFieldPreviewModel = createPreviewModel({
  state: () => ({}),
});

export type DropdownFieldPreviewState = InferPreviewState<
  typeof DropdownFieldPreviewModel
>;
