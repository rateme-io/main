import { reatomComponent } from '@reatom/npm-react';

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
    Preview: reatomComponent(
      (props) => <Preview {...props} />,
      'createFieldsManager.Preview',
    ),
  };
};
