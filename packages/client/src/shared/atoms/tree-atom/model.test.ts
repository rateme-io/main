import { Ctx } from '@reatom/framework';
import { createTestCtx } from '@reatom/testing';
import { describe, expect, it } from 'vitest';

import { treeAtom } from './model.ts';
import { NodeAtom } from './types.ts';

type SimpleNode = {
  id: string;
  childId?: string;
  lastChildId?: string;
  parentId?: string;
  prevId?: string;
  nextId?: string;
  children?: SimpleNode[];
};

const simplifyNode = <Payload>(ctx: Ctx, node: NodeAtom<Payload>) => {
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

type TestNode = { id: string; children?: TestNode[] };

const createTree = (tree: TestNode[], parentId?: string): SimpleNode[] => {
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

describe('nodeBuilder', () => {
  const setup = () => {
    const ctx = createTestCtx();
    const builder = treeAtom('testBuilder');
    return { ctx, builder };
  };

  it('should create a root node', () => {
    const { builder } = setup();
    expect(builder.getNode('root')).toBeDefined();
  });

  it('should create and retrieve a child node', () => {
    const { ctx, builder } = setup();
    const childNode = builder.createNode({ id: 'child1' }, 'child1');
    builder.addChild(ctx, childNode);

    expect(simplifyNode(ctx, childNode)).toStrictEqual({
      id: 'child1',
      parentId: 'root',
    });
  });

  it('should link parent and child correctly', () => {
    const { ctx, builder } = setup();
    const childNode = builder.createNode({ id: 'child1' }, 'child1');
    builder.addChild(ctx, childNode);

    expect(simplifyNode(ctx, builder.getNode('root')!)).toStrictEqual({
      id: 'root',
      childId: 'child1',
      lastChildId: 'child1',
      children: [
        {
          id: 'child1',
          parentId: 'root',
        },
      ],
    });
  });

  it('should detach a child node', () => {
    const { ctx, builder } = setup();
    const childNode = builder.createNode({ id: 'child1' }, 'child1');
    builder.addChild(ctx, childNode);

    expect(simplifyNode(ctx, childNode)).toStrictEqual({
      id: 'child1',
      parentId: 'root',
    });

    childNode.actions.detach(ctx);

    expect(builder.getNode('child1')).toBeNull();
    expect(simplifyNode(ctx, childNode)).toStrictEqual({ id: 'child1' });

    expect(simplifyNode(ctx, builder.getNode('root')!)).toStrictEqual({
      id: 'root',
    });
  });

  it('should move a node before as child', () => {
    const { ctx, builder } = setup();
    const childNode1 = builder.createNode({ id: 'child1' }, 'child1');
    const childNode2 = builder.createNode({ id: 'child2' }, 'child2');
    const childNode3 = builder.createNode({ id: 'child3' }, 'child3');
    const childNode4 = builder.createNode({ id: 'child4' }, 'child4');
    builder.addChild(ctx, childNode1);
    builder.addChild(ctx, childNode2);
    childNode2.actions.addChild(ctx, childNode3);
    childNode2.actions.addChild(ctx, childNode4);

    childNode1.actions.detach(ctx);
    childNode4.actions.before(ctx, childNode1);

    expect(simplifyNode(ctx, builder.getNode('root')!)).toStrictEqual(
      createTree([
        {
          id: 'root',
          children: [
            {
              id: 'child2',
              children: [{ id: 'child3' }, { id: 'child1' }, { id: 'child4' }],
            },
          ],
        },
      ])[0],
    );
  });

  it('should move a node before as sibling', () => {
    const { ctx, builder } = setup();
    const childNode1 = builder.createNode({ id: 'child1' }, 'child1');
    const childNode2 = builder.createNode({ id: 'child2' }, 'child2');
    const childNode3 = builder.createNode({ id: 'child3' }, 'child3');
    const childNode4 = builder.createNode({ id: 'child4' }, 'child4');
    builder.addChild(ctx, childNode1);
    builder.addChild(ctx, childNode2);
    childNode2.actions.addChild(ctx, childNode3);
    childNode2.actions.addChild(ctx, childNode4);

    childNode4.actions.detach(ctx);
    childNode1.actions.before(ctx, childNode4);

    expect(simplifyNode(ctx, builder.getNode('root')!)).toStrictEqual(
      createTree([
        {
          id: 'root',
          children: [
            { id: 'child4' },
            { id: 'child1' },
            {
              id: 'child2',
              children: [{ id: 'child3' }],
            },
          ],
        },
      ])[0],
    );
  });

  it('should move a node before as sibling 2', () => {
    const { ctx, builder } = setup();
    const childNode1 = builder.createNode({ id: 'child1' }, 'child1');
    const childNode2 = builder.createNode({ id: 'child2' }, 'child2');
    const childNode3 = builder.createNode({ id: 'child3' }, 'child3');
    const childNode4 = builder.createNode({ id: 'child4' }, 'child4');
    childNode1.actions.after(ctx, childNode2);
    childNode2.actions.addChild(ctx, childNode3);
    childNode3.actions.after(ctx, childNode4);

    builder.addChild(ctx, childNode1);

    childNode1.actions.detach(ctx);
    childNode4.actions.before(ctx, childNode1);

    childNode4.actions.detach(ctx);
    childNode2.actions.before(ctx, childNode4);

    expect(simplifyNode(ctx, builder.getNode('root')!)).toStrictEqual(
      createTree([
        {
          id: 'root',
          children: [
            { id: 'child4' },
            {
              id: 'child2',
              children: [{ id: 'child3' }, { id: 'child1' }],
            },
          ],
        },
      ])[0],
    );
  });

  it('should move a node after as child', () => {
    const { ctx, builder } = setup();
    const childNode1 = builder.createNode({ id: 'child1' }, 'child1');
    const childNode2 = builder.createNode({ id: 'child2' }, 'child2');
    const childNode3 = builder.createNode({ id: 'child3' }, 'child3');
    const childNode4 = builder.createNode({ id: 'child4' }, 'child4');
    builder.addChild(ctx, childNode1);
    builder.addChild(ctx, childNode2);
    childNode2.actions.addChild(ctx, childNode3);
    childNode2.actions.addChild(ctx, childNode4);

    childNode1.actions.detach(ctx);
    childNode4.actions.after(ctx, childNode1);

    expect(simplifyNode(ctx, builder.getNode('root')!)).toStrictEqual(
      createTree([
        {
          id: 'root',
          children: [
            {
              id: 'child2',
              children: [{ id: 'child3' }, { id: 'child4' }, { id: 'child1' }],
            },
          ],
        },
      ])[0],
    );
  });

  it('should move a node after as sibling', () => {
    const { ctx, builder } = setup();
    const childNode1 = builder.createNode({ id: 'child1' }, 'child1');
    const childNode2 = builder.createNode({ id: 'child2' }, 'child2');
    const childNode3 = builder.createNode({ id: 'child3' }, 'child3');
    const childNode4 = builder.createNode({ id: 'child4' }, 'child4');
    builder.addChild(ctx, childNode1);
    builder.addChild(ctx, childNode2);
    childNode2.actions.addChild(ctx, childNode3);
    childNode2.actions.addChild(ctx, childNode4);

    childNode4.actions.detach(ctx);
    childNode1.actions.after(ctx, childNode4);

    expect(simplifyNode(ctx, builder.getNode('root')!)).toStrictEqual(
      createTree([
        {
          id: 'root',
          children: [
            { id: 'child1' },
            { id: 'child4' },
            {
              id: 'child2',
              children: [{ id: 'child3' }],
            },
          ],
        },
      ])[0],
    );
  });
});
