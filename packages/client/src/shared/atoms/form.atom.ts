import { Action, action, atom } from '@reatom/framework';

import { FieldAtom } from '@/shared/atoms/field.atom.ts';

export const formAtom = <Form extends BaseForm>({
  fields,
  onSubmit,
}: {
  fields: Form;
  onSubmit: Action<[Fields<Form>], Promise<void>>;
}) => {
  const fieldsArray = Object.values(fields);

  const $values = atom<Fields<Form>>(
    (ctx) =>
      Object.keys(fields).reduce<Fields<Form>>((acc, key) => {
        Reflect.set(acc, key, ctx.spy(fields[key].$value));

        return acc;
      }, {} as Fields<Form>),
    '$values',
  );

  const validate = action((ctx) => {
    return fieldsArray.reduce(
      (isValid, field) => field.validate(ctx) === null && isValid,
      true,
    );
  }, 'validate');

  const reset = action((ctx) => {
    fieldsArray.forEach((field) => field.reset(ctx));
  }, 'reset');

  const submit = action(async (ctx) => {
    const isValid = validate(ctx);

    if (!isValid) {
      return;
    }

    const values = ctx.get($values);

    await ctx.schedule((ctx) => onSubmit(ctx, values as ValidFields<Form>));
  }, 'submit');

  return {
    $values,
    validate,
    reset,
    submit,
  };
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type BaseForm = { [key: string]: FieldAtom<any, any> };

export type Fields<Form extends BaseForm> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof Form]: Form[K] extends FieldAtom<infer Value, any>
    ? Value
    : never;
};

export type ValidFields<Form extends BaseForm> = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [K in keyof Form]: Form[K] extends FieldAtom<any, infer Value>
    ? Value
    : never;
};

export type FormAtom<Form extends BaseForm> = ReturnType<typeof formAtom<Form>>;
