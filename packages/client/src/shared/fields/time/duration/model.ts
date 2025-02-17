import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const DurationFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type DurationFieldState = InferState<typeof DurationFieldModel>;
