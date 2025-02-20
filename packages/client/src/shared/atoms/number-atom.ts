import { action, atom, withAssign } from '@reatom/framework';

export const numberAtom = (initialValue: number | null, name: string) => {
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
