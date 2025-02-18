import {
  createFieldModel,
  InferBuilderState,
} from '@/shared/field-builder/field';

export const LinkFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
    $name,
  }),
});

export type LinkFieldState = InferBuilderState<typeof LinkFieldModel>;
