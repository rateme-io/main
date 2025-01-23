import { action, atom } from '@reatom/framework';
import { ZodType } from 'zod';

export const fieldAtom = <Value, ValidValue extends Value>({
  defaultValue,
  schema,
}: {
  defaultValue: Value;
  schema: ZodType<ValidValue>;
}) => {
  const $value = atom(defaultValue, '$value');

  const $error = atom<string | null>(null, '$error');

  const validate = action((ctx) => {
    const value = ctx.get($value);
    const result = schema.safeParse(value);

    if (result.success) {
      $error(ctx, null);
      return null;
    }

    $error(ctx, result.error.errors[0].message);
    return value as ValidValue;
  }, 'validate');

  const reset = action((ctx) => {
    $value(ctx, defaultValue);
    $error(ctx, null);
  }, 'reset');

  return {
    $error,
    $value,
    validate,
    reset,
  };
};

export type FieldAtom<Value, ValidValue extends Value> = ReturnType<
  typeof fieldAtom<Value, ValidValue>
>;
