import { Action, action, Atom, atom, AtomMut } from '@reatom/framework';

import { Merge } from '@/shared/types/merge.ts';

export const nodeBuilder = <Payload>(name: string): BuilderAtom<Payload> => {
  const root = createNode(
    {
      id: 'root',
      payload: null as Payload,
    },
    `${name}.root`,
  ) as RootNode<Payload>;

  return {
    root,
  };
};

export const createNode = <Payload>(
  command: CreateNodeCommand<Payload>,
  name: string,
): NodeAtom<Payload> => {
  const $prev = atom<NodeAtom<Payload> | null>(null, `${name}.$prev`);
  const $next = atom<NodeAtom<Payload> | null>(null, `${name}.$next`);
  const $parent = atom<NodeAtom<Payload> | null>(
    command.parent ?? null,
    `${name}.$parent`,
  );
  const $child = atom<NodeAtom<Payload> | null>(null, `${name}.$child`);

  const $children = atom((ctx) => {
    const firstChild = ctx.spy($child);

    if (!firstChild) {
      return [];
    }

    const children = [firstChild];

    let currentChild = firstChild;

    while (ctx.spy(currentChild.state.$next)) {
      const child = ctx.spy(currentChild.state.$next);

      if (child) {
        currentChild = child;

        children.push(currentChild);
      }
    }

    return children;
  }, `${name}.$children`);

  const afterAction = action((ctx, node: NodeAtom<Payload>) => {
    const next = ctx.get($next);

    $next(ctx, node);

    if (next === null) {
      return;
    }

    next.state.$prev(ctx, node);
  }, `${name}.afterAction`);

  const beforeAction = action((ctx, node: NodeAtom<Payload>) => {
    const prev = ctx.get($prev);

    $prev(ctx, node);

    if (prev === null) {
      return;
    }

    prev.state.$next(ctx, node);
  }, `${name}.beforeAction`);

  const removeAction = action((ctx) => {
    const prev = ctx.get($prev);
    const next = ctx.get($next);

    if (prev) {
      prev.state.$next(ctx, next);
    }

    if (next) {
      next.state.$prev(ctx, prev);
    }

    if (prev === null && next === null) {
      const parent = ctx.get($parent);

      if (parent) {
        parent.state.$child(ctx, null);
      }
    }

    $prev(ctx, null);
    $next(ctx, null);
    $parent(ctx, null);
    $child(ctx, null);
  }, `${name}.removeAction`);

  const addChildAction = action((ctx, node: NodeAtom<Payload>) => {
    const child = ctx.get($child);

    if (child) {
      return false;
    }

    $child(ctx, node);

    node.state.$parent(ctx, currentNode);

    return true;
  }, `${name}.addChildAction`);

  const currentNode: NodeAtom<Payload> = {
    id: command.id,
    payload: command.payload,
    state: {
      $prev,
      $next,
      $parent,
      $child,
      $children,
    },
    actions: {
      after: afterAction,
      before: beforeAction,
      addChild: addChildAction,
      remove: removeAction,
    },
  };

  return currentNode;
};

export type CreateNodeCommand<Payload> = {
  payload: Payload;
  id: string;
  parent?: NodeAtom<Payload>;
};

export type NodeAtom<Payload = unknown> = {
  id: string;
  payload: Payload;
  state: {
    $next: AtomMut<NodeAtom<Payload> | null>;
    $prev: AtomMut<NodeAtom<Payload> | null>;
    $parent: AtomMut<NodeAtom<Payload> | null>;
    $child: AtomMut<NodeAtom<Payload> | null>;
    $children: Atom<NodeAtom<Payload>[]>;
  };
  actions: {
    after: Action<[node: NodeAtom<Payload>], void>;
    before: Action<[node: NodeAtom<Payload>], void>;
    addChild: Action<[node: NodeAtom<Payload>], boolean>;
    remove: Action<[], void>;
  };
};

export type RootNode<Payload> = Merge<{ payload: null }, NodeAtom<Payload>>;

export type BuilderAtom<Payload> = {
  root: RootNode<Payload>;
};
