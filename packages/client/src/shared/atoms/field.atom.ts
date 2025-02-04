import { action, atom } from '@reatom/framework';
import { ZodType } from 'zod';

export const fieldAtom = <Value, ValidValue extends Value = Value>({
  defaultValue,
  schema,
  name,
}: {
  defaultValue: Value;
  schema?: ZodType<ValidValue>;
  name: string;
}) => {
  const $value = atom(defaultValue, `${name}.$value`);

  const $error = atom<string | null>(null, `${name}.$error`);

  const validate = action((ctx) => {
    if (!schema) {
      $error(ctx, null);
      return null;
    }

    const value = ctx.get($value);
    const result = schema.safeParse(value);

    if (result.success) {
      $error(ctx, null);
      return result.data;
    }

    $error(ctx, result.error.errors[0].message);
    return null;
  }, `${name}.validate`);

  const reset = action((ctx) => {
    $value(ctx, defaultValue);
    $error(ctx, null);
  }, `${name}.reset`);

  return {
    $error,
    $value,
    validate,
    reset,
  };
};

export type FieldAtom<Value, ValidValue extends Value = Value> = ReturnType<
  typeof fieldAtom<Value, ValidValue>
>;
