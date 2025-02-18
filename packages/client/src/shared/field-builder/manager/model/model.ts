import { action, atom, Ctx } from '@reatom/framework';

import { treeAtom } from '@/shared/atoms/tree-atom';
import { Field } from '@/shared/field-builder/field';

import { BoardNode, CreateFieldsManagerCommand, NodePayload } from './types.ts';

export const createModel = (command: CreateFieldsManagerCommand) => {
  const tree = treeAtom<NodePayload>('fieldsManager.tree');

  const createNode = (field: Field<unknown>) => {
    const $name = atom('', '$name');

    return tree.createNode(
      {
        ...field.createBuilder({
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
    groups: command.groups,
    actions: {
      validate,
      submit: action((ctx) => {
        return validate(ctx);
      }, 'actions.submit'),
      addChild: action((ctx, field: Field<unknown>) => {
        const node = createNode(field);

        tree.addChild(ctx, node);

        return node;
      }, 'actions.addChild') as <State>(
        ctx: Ctx,
        field: Field<State>,
      ) => BoardNode<State>,
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

export type FieldBuilderModel = ReturnType<typeof createModel>;
