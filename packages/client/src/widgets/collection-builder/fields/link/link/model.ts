import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const LinkFieldModel = createFieldModel({
  state: ({ $name }) => ({
    $name,
  }),
});

export type LinkFieldState = InferState<typeof LinkFieldModel>;
