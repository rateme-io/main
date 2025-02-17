import { createFieldModel, InferState } from '@/shared/field-builder/field';

export const InternalLinkFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type InternalLinkFieldState = InferState<typeof InternalLinkFieldModel>;
