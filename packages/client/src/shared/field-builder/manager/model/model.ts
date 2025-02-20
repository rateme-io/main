import { action, atom, Ctx } from '@reatom/framework';

import { treeAtom } from '@/shared/atoms/tree-atom';
import { Field } from '@/shared/field-builder/field';
import { generateId } from '@/shared/utils/generate-id.ts';

import { BoardNode, CreateFieldsManagerCommand, NodePayload } from './types.ts';

export const createModel = (command: CreateFieldsManagerCommand) => {
  const tree = treeAtom<NodePayload>('fieldsManager.tree');

  const createNode = (field: Field<unknown, unknown>) => {
    const $name = atom('', '$name');

    return tree.createNode(
      {
        id: `${field.id}-${generateId()}`,
        builder: field.builder.model.create({
          $name,
        }),
        preview: field.preview.model.create(),
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
      return node.builder.issueManager.validate(ctx) && isValid;
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
      addChild: action((ctx, field: Field<unknown, unknown>) => {
        const node = createNode(field);

        tree.addChild(ctx, node);

        return node;
      }, 'actions.addChild') as <BuilderState, PreviewState>(
        ctx: Ctx,
        field: Field<BuilderState, PreviewState>,
      ) => BoardNode<BuilderState, PreviewState>,
      insertAfter: action(
        (ctx, node: BoardNode, field: Field<unknown, unknown>) => {
          node.actions.after(ctx, createNode(field));
        },
        'actions.insertAfter',
      ),
      moveAfter: action((ctx, node: BoardNode, target: BoardNode) => {
        target.actions.detach(ctx);

        node.actions.after(ctx, target);
      }, 'actions.moveAfter'),
      insertBefore: action(
        (ctx, node: BoardNode, field: Field<unknown, unknown>) => {
          node.actions.before(ctx, createNode(field));
        },
        'actions.insertBefore',
      ),
      moveBefore: action((ctx, node: BoardNode, target: BoardNode) => {
        target.actions.detach(ctx);

        node.actions.before(ctx, target);
      }, 'actions.moveBefore'),
    },
  };
};

export type FieldBuilderModel = ReturnType<typeof createModel>;
