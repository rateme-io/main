import { createModel } from './model';
import { Board } from './ui/board';
import { IssueRenderer } from './ui/components/issue-renderer';
import { Menu } from './ui/menu';
import { Preview } from './ui/preview';
import { Root } from './ui/root';

export const FieldBuilder = {
  createModel: createModel,
  ui: {
    IssueRenderer: IssueRenderer,
    Root: Root,
    Menu: Menu,
    Preview: Preview,
    Board: Board,
  },
};

export type { FieldsManagerModel } from './model/model';
export * from './model/types';
