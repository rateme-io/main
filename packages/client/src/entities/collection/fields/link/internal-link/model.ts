import {
  createFieldModel,
  InferBuilderState,
} from '@/shared/field-builder/field';

export const InternalLinkFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type InternalLinkFieldState = InferBuilderState<
  typeof InternalLinkFieldModel
>;
