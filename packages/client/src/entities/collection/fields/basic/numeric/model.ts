import { action, atom, withAssign } from '@reatom/framework';

import {
  createFieldModel,
  InferBuilderState,
} from '@/shared/field-builder/field';

export const NumericFieldModel = createFieldModel({
  builderState: ({ $name }) => ({
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
  validateField: (ctx, { state, validateName, addIssue }) => {
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

const numberAtom = (initialValue: number | null, name: string) => {
  const $value = atom(initialValue, `${name}.$value`);

  return action((ctx, nextValue: unknown) => {
    if (typeof nextValue === 'number' || nextValue === null) {
      return $value(ctx, nextValue);
    }

    const nextNumber = parseFloat(`${nextValue}`);

    if (!isNaN(nextNumber)) {
      return $value(ctx, nextNumber);
    }

    return $value(ctx, null);
  }, `${name}.numberAtom`).pipe(
    withAssign(() => atom((ctx) => ctx.spy($value), `${name}.numberAtom`)),
  );
};

export type NumberAtom = ReturnType<typeof numberAtom>;

export const NUMERIC_FIELD_EMPTY_MAX_ISSUE = Symbol(
  'NUMERIC_FIELD_EMPTY_MAX_ISSUE',
);
export const NUMERIC_FIELD_EMPTY_MIN_ISSUE = Symbol(
  'NUMERIC_FIELD_EMPTY_MIN_ISSUE',
);
export const NUMERIC_FIELD_MIN_GREATER_THAN_MAX_ISSUE = Symbol(
  'NUMERIC_FIELD_MIN_GREATER_THAN_MAX_ISSUE',
);

export type NumericFieldState = InferBuilderState<typeof NumericFieldModel>;
