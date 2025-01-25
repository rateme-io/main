import { action, atom } from '@reatom/framework';

export const disclosureAtom = ({
  defaultIsOpened,
  name,
}: {
  defaultIsOpened?: boolean;
  name: string;
}) => {
  const $isOpened = atom(defaultIsOpened ?? false, `${name}.$isOpened`);

  return {
    $isOpened,
    open: action((ctx) => $isOpened(ctx, true), `${name}.open`),
    close: action((ctx) => $isOpened(ctx, false), `${name}.close`),
    toggle: action(
      (ctx) => $isOpened(ctx, ctx.get($isOpened)),
      `${name}.toggle`,
    ),
  };
};

export type DisclosureAtom = ReturnType<typeof disclosureAtom>;
