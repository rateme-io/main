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
    Root: (props) => <Root {...props} value={context} />,
    Menu: (props) => <Menu {...props} />,
    Board: (props) => <Board {...props} />,
    Preview: (props) => <Preview {...props} />,
  };
};
