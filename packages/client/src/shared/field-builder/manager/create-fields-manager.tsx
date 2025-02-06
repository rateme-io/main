import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { createModel } from './model';
import { CreateFieldsManagerCommand, FieldsManager } from './types.ts';
import { Board } from './ui/board.tsx';
import { FieldManagerContextInterface } from './ui/context.ts';
import { Menu } from './ui/menu.tsx';
import { Preview } from './ui/preview.tsx';
import { Root } from './ui/root.tsx';

export const createFieldsManager = (
  command: CreateFieldsManagerCommand,
): FieldsManager => {
  const model = createModel();

  const context: FieldManagerContextInterface = {
    groups: command.groups,
    model,
  };

  return {
    model,
    Root: reatomMemo(
      (props) => <Root {...props} value={context} />,
      'createFieldsManager.Root',
    ),
    Menu: reatomMemo(
      (props) => <Menu {...props} />,
      'createFieldsManager.Menu',
    ),
    Board: reatomMemo(
      (props) => <Board {...props} />,
      'createFieldsManager.Board',
    ),
    Preview: reatomMemo(
      (props) => <Preview {...props} />,
      'createFieldsManager.Preview',
    ),
  };
};
