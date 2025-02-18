import { createModel } from './model';
import { Board } from './ui/board';
import { IssueRenderer } from './ui/components/issue-renderer';
import { useFieldBuilderContext } from './ui/context.ts';
import { Menu } from './ui/menu';
import { Preview } from './ui/preview';
import { Root } from './ui/root';

export const FieldBuilder = {
  createModel: createModel,
  ui: {
    useContext: () => useFieldBuilderContext(),
    IssueRenderer: IssueRenderer,
    Root: Root,
    Menu: Menu,
    Preview: Preview,
    Board: Board,
  },
};

export type { FieldBuilderModel } from './model/model';
export * from './model/types';
