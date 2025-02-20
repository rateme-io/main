import { atom } from '@reatom/framework';

import { numberAtom } from '@/shared/atoms/number-atom';
import {
  createBuilderModel,
  InferBuilderState,
} from '@/shared/field-builder/field';

export const NUMERIC_FIELD_EMPTY_MIN_ISSUE = Symbol(
  'NUMERIC_FIELD_EMPTY_MIN_ISSUE',
);
export const NUMERIC_FIELD_EMPTY_MAX_ISSUE = Symbol(
  'NUMERIC_FIELD_EMPTY_MAX_ISSUE',
);
export const NUMERIC_FIELD_MIN_GREATER_THAN_MAX_ISSUE = Symbol(
  'NUMERIC_FIELD_MIN_GREATER_THAN_MAX_ISSUE',
);

export const NumericFieldBuilderModel = createBuilderModel({
  state: ({ $name }) => ({
    $name,
    min: {
      $value: numberAtom(null, 'min.$value'),
      $enabled: atom(false, 'min.$enabled'),
    },
    max: {
      $value: numberAtom(null, 'max.$value'),
      $enabled: atom(false, 'max.$enabled'),
    },
  }),
  validate: (ctx, { state, validateName, addIssue }) => {
    validateName(ctx, ctx.get(state.$name));

    const minValue = ctx.get(state.min.$value);
    const minEnabled = ctx.get(state.min.$enabled);

    const maxValue = ctx.get(state.max.$value);
    const maxEnabled = ctx.get(state.max.$enabled);

    if (minEnabled && minValue === null) {
      addIssue(ctx, {
        type: 'critical',
        id: NUMERIC_FIELD_EMPTY_MIN_ISSUE,
      });
    }

    if (maxEnabled && maxValue === null) {
      addIssue(ctx, {
        type: 'critical',
        id: NUMERIC_FIELD_EMPTY_MAX_ISSUE,
      });
    }

    if (
      minEnabled &&
      maxEnabled &&
      minValue !== null &&
      maxValue !== null &&
      minValue >= maxValue
    ) {
      addIssue(ctx, {
        type: 'critical',
        id: NUMERIC_FIELD_MIN_GREATER_THAN_MAX_ISSUE,
      });
    }
  },
});

export type NumericFieldBuilderState = InferBuilderState<
  typeof NumericFieldBuilderModel
>;
