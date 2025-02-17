import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const ImagesFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type ImagesFieldState = InferState<typeof ImagesFieldModel>;
