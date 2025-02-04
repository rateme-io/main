import { atom } from '@reatom/framework';
import { reatomComponent } from '@reatom/npm-react';

import { treeAtom } from '@/shared/atoms/tree-atom';

import {
  BoardNode,
  CreateFieldsManagerCommand,
  FieldsManager,
  NodePayload,
} from './types.ts';
import { Board } from './ui/board.tsx';
import { FieldManagerContextInterface } from './ui/context.ts';
import { Menu } from './ui/menu.tsx';
import { Root } from './ui/root.tsx';

export const createFieldsManager = (
  command: CreateFieldsManagerCommand,
): FieldsManager => {
  const tree = treeAtom<NodePayload>('fieldsManager.tree');

  const context: FieldManagerContextInterface = {
    groups: command.groups,
    tree,
    createNode: (field) => {
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
    },
    $lastActiveNode: atom<BoardNode | null>(null, 'context.$lastActiveNode'),
  };

  return {
    Root: reatomComponent(
      (props) => <Root {...props} value={context} />,
      'createFieldsManager.Root',
    ),
    Menu: reatomComponent(
      (props) => <Menu {...props} />,
      'createFieldsManager.Menu',
    ),
    Board: reatomComponent(
      (props) => <Board {...props} />,
      'createFieldsManager.Board',
    ),
  };
};
