import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const InternalLinkFieldModel = createFieldModel({
  state: ({ $name }) => ({
    $name,
  }),
});

export type InternalLinkFieldState = InferState<typeof InternalLinkFieldModel>;
