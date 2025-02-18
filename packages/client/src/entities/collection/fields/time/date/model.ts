import {
  createFieldModel,
  InferBuilderState,
} from '@/shared/field-builder/field';

export const DateFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type DateFieldState = InferBuilderState<typeof DateFieldModel>;
