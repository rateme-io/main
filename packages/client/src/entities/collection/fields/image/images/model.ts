import {
  createFieldModel,
  InferBuilderState,
} from '@/shared/field-builder/field';

export const ImagesFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type ImagesFieldState = InferBuilderState<typeof ImagesFieldModel>;
