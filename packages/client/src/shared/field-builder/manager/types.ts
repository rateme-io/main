import { FunctionComponent } from 'react';

import { NodeAtom } from '@/shared/atoms/tree-atom';
import { Field } from '@/shared/field-builder/field';
import { FieldGroup } from '@/shared/field-builder/group';

import { FieldsManagerBoardProps } from './ui/board.tsx';
import { FieldManagerMenuProps } from './ui/menu.tsx';
import { FieldsManagerRootProps } from './ui/root.tsx';

export type CreateFieldsManagerCommand = {
  groups: FieldGroup[];
};

export type FieldsManager = {
  Root: FunctionComponent<Omit<FieldsManagerRootProps, 'value'>>;
  Menu: FunctionComponent<FieldManagerMenuProps>;
  Board: FunctionComponent<FieldsManagerBoardProps>;
};

export type BoardNode = NodeAtom<NodePayload>;

export type NodePayload = {
  state: unknown;
  field: Field<unknown>;
};
