import { createTestCtx } from '@reatom/testing';
import { describe, expect, it } from 'vitest';

import { treeAtom } from './model.ts';
import { deepTraversAction } from './utils.ts';

describe('deepTraversAction', () => {
  const setup = () => {
    const ctx = createTestCtx();
    const builder = treeAtom('testBuilder');
    return { ctx, builder };
  };

  it('should traverse tree in DFS order - simple', () => {
    const { ctx, builder } = setup();
    const child1 = builder.createNode({ id: 'child1' }, 'child1');
    const child2 = builder.createNode({ id: 'child2' }, 'child2');
    const grandchild1 = builder.createNode(
      { id: 'grandchild1' },
      'grandchild1',
    );
    builder.addChild(ctx, child1);
    builder.addChild(ctx, child2);
    child2.actions.addChild(ctx, grandchild1);
    const visited: string[] = [];
    deepTraversAction(ctx, builder.root, (_ctx, node) => {
      visited.push(node.id);
    });
    expect(visited).toStrictEqual(['root', 'child1', 'child2', 'grandchild1']);
  });

  it('should traverse tree in DFS order - complex', () => {
    const { ctx, builder } = setup();
    const child1 = builder.createNode({ id: 'child1' }, 'child1');
    const child2 = builder.createNode({ id: 'child2' }, 'child2');
    const child3 = builder.createNode({ id: 'child3' }, 'child3');
    const grandchild1 = builder.createNode(
      { id: 'grandchild1' },
      'grandchild1',
    );
    const grandchild2 = builder.createNode(
      { id: 'grandchild2' },
      'grandchild2',
    );
    builder.addChild(ctx, child1);
    builder.addChild(ctx, child2);
    builder.addChild(ctx, child3);
    child2.actions.addChild(ctx, grandchild1);
    child2.actions.addChild(ctx, grandchild2);
    const visited: string[] = [];
    deepTraversAction(ctx, builder.root, (_ctx, node) => {
      visited.push(node.id);
    });
    expect(visited).toStrictEqual([
      'root',
      'child1',
      'child2',
      'grandchild1',
      'grandchild2',
      'child3',
    ]);
  });

  it('should traverse tree with only root node', () => {
    const { ctx, builder } = setup();
    const visited: string[] = [];
    deepTraversAction(ctx, builder.root, (_ctx, node) => {
      visited.push(node.id);
    });
    expect(visited).toStrictEqual(['root']);
  });
});
