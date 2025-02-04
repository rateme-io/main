import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const DurationFieldModel = createFieldModel({
  state: ({ $name }) => ({
    $name,
  }),
});

export type DurationFieldState = InferState<typeof DurationFieldModel>;
