import { Ctx } from '@reatom/framework';

import { NodeAtom } from '@/shared/atoms/tree-atom/types.ts';

export type SimpleNode = {
  id: string;
  childId?: string;
  lastChildId?: string;
  parentId?: string;
  prevId?: string;
  nextId?: string;
  children?: SimpleNode[];
};

export const simplifyNode = <Payload>(ctx: Ctx, node: NodeAtom<Payload>) => {
  const { nodes, id } = node;

  const { $child, $lastChild, $parent, $prev, $next, $children } = nodes;

  const child = ctx.get($child);
  const lastChild = ctx.get($lastChild);
  const parent = ctx.get($parent);
  const prev = ctx.get($prev);
  const next = ctx.get($next);
  const children = ctx.get($children);

  const result: SimpleNode = {
    id: id,
  };

  if (child) {
    result.childId = child.id;
  }

  if (lastChild) {
    result.lastChildId = lastChild.id;
  }

  if (parent) {
    result.parentId = parent.id;
  }

  if (prev) {
    result.prevId = prev.id;
  }

  if (next) {
    result.nextId = next.id;
  }

  if (children.length) {
    result.children = children.map((child) => simplifyNode(ctx, child));
  }

  return result;
};

export type TestNode = { id: string; children?: TestNode[] };

export const createTree = (tree: TestNode[], parentId?: string): SimpleNode[] => {
  return tree.map(({ id, children }, index) => {
    const childrenNodes = children ? createTree(children, id) : [];

    const node: SimpleNode = { id };

    const prevNode = tree[index - 1];

    if (prevNode) {
      node.prevId = prevNode.id;
    }

    const nextNode = tree[index + 1];

    if (nextNode) {
      node.nextId = nextNode.id;
    }

    if (childrenNodes.length) {
      node.childId = childrenNodes[0].id;
      node.lastChildId = childrenNodes[childrenNodes.length - 1].id;
      node.children = childrenNodes;
    }

    if (parentId) {
      node.parentId = parentId;
    }

    return node;
  });
};
