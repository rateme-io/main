import { action, atom } from '@reatom/framework';

import { treeAtom } from '@/shared/atoms/tree-atom';
import { Field } from '@/shared/field-builder/field';

import { BoardNode, NodePayload } from '../types.ts';

export const createModel = () => {
  const tree = treeAtom<NodePayload>('fieldsManager.tree');

  const createNode = (field: Field<unknown>) => {
    const $name = atom('', '$name');

    return tree.createNode(
      {
        ...field.create({
          $name,
        }),
        $name,
        field,
      },
      field.id,
    );
  };

  const validate = action((ctx) => {
    const nodes = tree.getNodes(ctx);

    if (nodes.length === 0) {
      return false;
    }

    return nodes.reduce((isValid, node) => {
      return node.issueManager.validate(ctx) && isValid;
    }, true);
  }, 'validate');

  return {
    tree,
    createNode,
    actions: {
      validate,
      submit: action((ctx) => {
        return validate(ctx);
      }, 'actions.submit'),
      addChild: action((ctx, field: Field<unknown>) => {
        tree.addChild(ctx, createNode(field));
      }, 'actions.addChild'),
      insertAfter: action((ctx, node: BoardNode, field: Field<unknown>) => {
        node.actions.after(ctx, createNode(field));
      }, 'actions.insertAfter'),
      moveAfter: action((ctx, node: BoardNode, target: BoardNode) => {
        target.actions.detach(ctx);

        node.actions.after(ctx, target);
      }, 'actions.moveAfter'),
      insertBefore: action((ctx, node: BoardNode, field: Field<unknown>) => {
        node.actions.before(ctx, createNode(field));
      }, 'actions.insertBefore'),
      moveBefore: action((ctx, node: BoardNode, target: BoardNode) => {
        target.actions.detach(ctx);

        node.actions.before(ctx, target);
      }, 'actions.moveBefore'),
    },
  };
};

export type FieldsManagerModel = ReturnType<typeof createModel>;
