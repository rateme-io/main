import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const DateFieldModel = createFieldModel({
  state: ({ $name }) => ({
    $name,
  }),
});

export type DateFieldState = InferState<typeof DateFieldModel>;
