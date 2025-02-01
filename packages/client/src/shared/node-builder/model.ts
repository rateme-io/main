import { action, atom } from '@reatom/framework';

import { CreateNodeCommand, NodeAtom, NodeBuilder } from './types';

export const nodeBuilder = <Payload>(name: string): NodeBuilder<Payload> => {
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
    find: root.actions.find,
    createNode,
    getNode: (id: string) => nodesMap.get(id) ?? null,
  } as NodeBuilder<Payload>;
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

      let currentChild = firstChild;

      while (ctx.get(currentChild.nodes.$next)) {
        const child = ctx.spy(currentChild.nodes.$next);

        if (child) {
          currentChild = child;

          children.push(currentChild);
        }
      }

      return children;
    }, `${name}.$children`);

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

      while (lastSibling) {
        lastSibling.nodes.$parent(ctx, currentNode);

        const next = ctx.get(lastSibling.nodes.$next);

        if (!next) {
          break;
        }

        lastSibling = next;
      }

      if (last) {
        last.actions.after(ctx, node);

        $lastChild(ctx, lastSibling);
      } else {
        $child(ctx, node);
        $lastChild(ctx, lastSibling);
      }
    }, `${name}.addChildAction`);

    const findFirstSiblingAction = action((ctx) => {
      let currentChild = currentNode;

      while (currentChild) {
        const prev = ctx.get(currentChild.nodes.$prev);

        if (!prev) {
          return currentChild;
        }

        currentChild = prev;
      }

      return null;
    }, `${name}.findFirstSiblingAction`);

    const findLastSiblingAction = action((ctx) => {
      let currentChild = currentNode;

      while (currentChild) {
        const next = ctx.get(currentChild.nodes.$next);

        if (!next) {
          return currentChild;
        }

        currentChild = next;
      }

      return null;
    }, `${name}.findLastSiblingAction`);

    const findAction = action((ctx, id: string) => {
      if (command.id === id) {
        return currentNode;
      }

      const firstChild = ctx.get($child);

      if (!firstChild) {
        return null;
      }

      let currentChild = firstChild;

      while (currentChild) {
        const found = currentChild.actions.find(ctx, id);

        if (found) {
          return found;
        }

        const child = ctx.get(currentChild.nodes.$next);

        if (child) {
          currentChild = child;
        }
      }

      return null;
    }, `${name}.findAction`);

    const isChildAction = action((ctx, node: NodeAtom<Payload>) => {
      let currentParent: NodeAtom<Payload> | null = node;

      while (currentParent) {
        if (currentParent.id === command.id) {
          return true;
        }

        currentParent = ctx.get(currentParent.nodes.$parent);
      }

      return false;
    }, `${name}.isChildAction`);

    const isParentAction = action((ctx, node: NodeAtom<Payload>) => {
      let currentChild: NodeAtom<Payload> | null = currentNode;

      while (currentChild) {
        if (currentChild.id === node.id) {
          return true;
        }

        currentChild = ctx.get(currentChild.nodes.$parent);
      }

      return false;
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
        find: findAction,
        isChild: isChildAction,
        isParent: isParentAction,
        findFirstSibling: findFirstSiblingAction,
        findLastSibling: findLastSiblingAction,
      },
    };

    nodesMap.set(command.id, currentNode);

    return currentNode;
  };
