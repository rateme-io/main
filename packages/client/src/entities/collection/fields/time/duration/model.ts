import {
  createFieldModel,
  InferBuilderState,
} from '@/shared/field-builder/field';

export const DurationFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type DurationFieldState = InferBuilderState<typeof DurationFieldModel>;
