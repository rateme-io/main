import { AtomMut } from '@reatom/framework';
import { FunctionComponent } from 'react';

import { NodeAtom } from '@/shared/atoms/tree-atom';
import { Field, FieldBuilderInstance } from '@/shared/field-builder/field';
import { FieldGroup } from '@/shared/field-builder/group';

import { FieldsManagerModel } from './model';
import { FieldsManagerBoardProps } from './ui/board.tsx';
import { FieldManagerMenuProps } from './ui/menu.tsx';
import { FieldsManagerPreviewProps } from './ui/preview.tsx';
import { FieldsManagerRootProps } from './ui/root.tsx';

export type CreateFieldsManagerCommand = {
  groups: FieldGroup[];
};

export type FieldsManager = {
  model: FieldsManagerModel;
  Root: FunctionComponent<Omit<FieldsManagerRootProps, 'value'>>;
  Menu: FunctionComponent<FieldManagerMenuProps>;
  Board: FunctionComponent<FieldsManagerBoardProps>;
  Preview: FunctionComponent<FieldsManagerPreviewProps>;
};

export type BoardNode = NodeAtom<NodePayload>;

export type NodePayload = {
  field: Field<unknown>;
  $name: AtomMut<string>;
} & FieldBuilderInstance<unknown>;
