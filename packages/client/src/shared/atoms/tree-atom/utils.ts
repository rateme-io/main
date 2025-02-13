import { action, Atom, Ctx } from '@reatom/framework';

import { NodeAtom } from './types.ts';

export type TraversAction = <Payload>(
  ctx: Ctx,
  startNode: NodeAtom<Payload>,
  callback: (ctx: Ctx, current: NodeAtom<Payload>) => NodeAtom<Payload> | null,
) => void;

export const traversAction = action(
  <Payload>(
    ctx: Ctx,
    startNode: NodeAtom<Payload>,
    callback: (
      ctx: Ctx,
      current: NodeAtom<Payload>,
    ) => NodeAtom<Payload> | null,
  ) => {
    let currentChild = callback(ctx, startNode);

    while (currentChild) {
      currentChild = callback(ctx, currentChild);
    }
  },
  'traversAction',
) as TraversAction;

export type DeepTraversAction = <Payload>(
  ctx: Ctx,
  startNode: NodeAtom<Payload>,
  callback: (ctx: Ctx, current: NodeAtom<Payload>) => void,
) => void;

export const deepTraversAction = action(
  <Payload>(
    ctx: Ctx,
    startNode: NodeAtom<Payload>,
    callback: (ctx: Ctx, current: NodeAtom<Payload>) => void,
  ) => {
    const stack: NodeAtom<Payload>[] = [];

    traversAction(ctx, startNode, (ctx, current) => {
      callback(ctx, current);

      const child = spyGet(ctx, current.nodes.$child);

      if (child) {
        const sibling = spyGet(ctx, current.nodes.$next);

        if (sibling) {
          stack.push(sibling);
        }

        return child;
      }

      const next = spyGet(ctx, current.nodes.$next);

      if (next) {
        return next;
      }

      const last = stack.pop();

      if (last) {
        return last;
      }

      return null;
    });
  },
  'deepTraversAction',
) as DeepTraversAction;

const spyGet = <T>(ctx: Ctx, atom: Atom<T>): T => {
  return ctx.spy ? ctx.spy(atom) : ctx.get(atom);
};
