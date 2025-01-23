import { action, atom } from '@reatom/framework';

export const disclosureAtom = ({
  defaultIsOpened,
}: {
  defaultIsOpened?: boolean;
}) => {
  const $isOpened = atom(defaultIsOpened ?? false, '$isOpened');

  return {
    $isOpened,
    open: action((ctx) => $isOpened(ctx, true), 'disclosureAtom.open'),
    close: action((ctx) => $isOpened(ctx, false), 'disclosureAtom.close'),
    toggle: action(
      (ctx) => $isOpened(ctx, ctx.get($isOpened)),
      'disclosureAtom.toggle',
    ),
  };
};

export type DisclosureAtom = ReturnType<typeof disclosureAtom>;
