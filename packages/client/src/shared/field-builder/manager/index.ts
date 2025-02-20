import { createModel } from './model';
import { Board } from './ui/board';
import { DefaultFieldRenderer } from './ui/components/default-field-renderer.tsx';
import { useFieldContext } from './ui/components/field.context.ts';
import { IssueRenderer } from './ui/components/issue-renderer';
import { useFieldBuilderContext } from './ui/context.ts';
import { Menu } from './ui/menu';
import { Preview } from './ui/preview';
import { Root } from './ui/root';

export const FieldBuilder = {
  createModel: createModel,
  ui: {
    useContext: () => useFieldBuilderContext(),
    useFieldContext: <State>() => useFieldContext<State>(),
    IssueRenderer: IssueRenderer,
    ValueRenderer: DefaultFieldRenderer,
    Root: Root,
    Menu: Menu,
    Preview: Preview,
    Board: Board,
  },
};

export type { FieldBuilderModel } from './model/model';
export * from './model/types';
