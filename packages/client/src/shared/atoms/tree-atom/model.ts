import { action, atom, Ctx } from '@reatom/framework';

import { CreateNodeCommand, NodeAtom, TreeAtom } from './types.ts';

export const treeAtom = <Payload>(name: string): TreeAtom<Payload> => {
  const nodesMap = new Map<string, NodeAtom<Payload>>();

  const createNode = nodeFactory({ nodesMap });

  const root = createNode(
    {
      id: 'root',
    } as CreateNodeCommand<Payload>,
    `${name}.root`,
  );

  return {
    root,
    $child: root.nodes.$child,
    $children: root.nodes.$children,
    $lastChild: root.nodes.$lastChild,
    addChild: root.actions.addChild,
    createNode,
    getNode: (id: string) => nodesMap.get(id) ?? null,
    getNodes: () => Array.from(nodesMap.values()),
  } as TreeAtom<Payload>;
};

const nodeFactory =
  <Payload>({ nodesMap }: { nodesMap: Map<string, NodeAtom<Payload>> }) =>
  (command: CreateNodeCommand<Payload>, name: string): NodeAtom<Payload> => {
    const $prev = atom<NodeAtom<Payload> | null>(null, `${name}.$prev`);
    const $next = atom<NodeAtom<Payload> | null>(null, `${name}.$next`);
    const $parent = atom<NodeAtom<Payload> | null>(null, `${name}.$parent`);
    const $child = atom<NodeAtom<Payload> | null>(null, `${name}.$child`);
    const $lastChild = atom<NodeAtom<Payload> | null>(
      null,
      `${name}.$lastChild`,
    );

    const $children = atom((ctx) => {
      const firstChild = ctx.spy($child);

      if (!firstChild) {
        return [];
      }

      const children = [firstChild];

      traversAction(ctx, firstChild, (_, current) => {
        const child = ctx.spy(current.nodes.$next);

        if (child) {
          children.push(child);
        }

        return child;
      });

      return children;
    }, `${name}.$children`);

    const traversAction = action(
      (
        ctx,
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
      `${name}.traversAction`,
    );

    const afterAction = action((ctx, node: NodeAtom<Payload>) => {
      if (node.id === currentNode.id) {
        return;
      }

      nodesMap.set(node.id, node);

      const next = ctx.get($next);

      $next(ctx, node);

      node.nodes.$parent(ctx, ctx.get($parent));
      node.nodes.$next(ctx, next);
      node.nodes.$prev(ctx, currentNode);

      if (next === null) {
        ctx.get($parent)?.nodes?.$lastChild(ctx, node);
      } else {
        next.nodes.$prev(ctx, node);
      }
    }, `${name}.afterAction`);

    const beforeAction = action((ctx, node: NodeAtom<Payload>) => {
      if (node.id === currentNode.id) {
        return;
      }

      nodesMap.set(node.id, node);

      const prev = ctx.get($prev);

      $prev(ctx, node);

      node.nodes.$parent(ctx, ctx.get($parent));
      node.nodes.$prev(ctx, prev);
      node.nodes.$next(ctx, currentNode);

      if (prev === null) {
        ctx.get($parent)?.nodes?.$child(ctx, node);
      } else {
        prev.nodes.$next(ctx, node);
      }
    }, `${name}.beforeAction`);

    const detachAction = action((ctx) => {
      const prev = ctx.get($prev);
      const next = ctx.get($next);

      if (prev) {
        prev.nodes.$next(ctx, next);
      } else {
        ctx.get($parent)?.nodes.$child(ctx, next);
      }

      if (next) {
        next.nodes.$prev(ctx, prev);
      } else {
        ctx.get($parent)?.nodes.$lastChild(ctx, prev);
      }

      $prev(ctx, null);
      $next(ctx, null);
      $parent(ctx, null);
      nodesMap.delete(command.id);
    }, `${name}.detachAction`);

    const addChildAction = action((ctx, node: NodeAtom<Payload>) => {
      nodesMap.set(node.id, node);

      const last = ctx.get($lastChild);

      let lastSibling = node;

      traversAction(ctx, node, (_, current) => {
        current.nodes.$parent(ctx, currentNode);

        const next = ctx.get(lastSibling.nodes.$next);

        if (next) {
          lastSibling = next;
        }

        return next;
      });

      if (last) {
        last.actions.after(ctx, node);

        $lastChild(ctx, lastSibling);
      } else {
        $child(ctx, node);
        $lastChild(ctx, lastSibling);
      }
    }, `${name}.addChildAction`);

    const isChildAction = action((ctx, node: NodeAtom<Payload>) => {
      let isChild = false;

      traversAction(ctx, node, (_, current) => {
        if (current.id === currentNode.id) {
          isChild = true;
          return null;
        }

        return ctx.get(current.nodes.$parent);
      });

      return isChild;
    }, `${name}.isChildAction`);

    const isParentAction = action((ctx, node: NodeAtom<Payload>) => {
      let isChild = false;

      traversAction(ctx, currentNode, (_, current) => {
        if (current.id === node.id) {
          isChild = true;
          return null;
        }

        return ctx.get(current.nodes.$parent);
      });

      return isChild;
    }, `${name}.isParentAction`);

    const currentNode: NodeAtom<Payload> = {
      ...command,
      id: command.id,
      nodes: {
        $prev,
        $next,
        $parent,
        $child,
        $lastChild,
        $children,
      },
      actions: {
        after: afterAction,
        before: beforeAction,
        addChild: addChildAction,
        detach: detachAction,
        isChild: isChildAction,
        isParent: isParentAction,
        travers: action(
          (ctx, callback) => traversAction(ctx, currentNode, callback),
          `${name}.travers`,
        ),
      },
    };

    if (command.id !== 'root') {
      nodesMap.set(command.id, currentNode);
    }

    return currentNode;
  };
