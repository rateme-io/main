import { AtomMut } from '@reatom/framework';
import { createContext, useContext } from 'react';

import { TreeAtom } from '@/shared/atoms/tree-atom';
import { Field } from '@/shared/field-builder/field';
import { FieldGroup } from '@/shared/field-builder/group';

import { BoardNode, NodePayload } from '../types';

export type FieldManagerContextInterface = {
  groups: FieldGroup[];
  tree: TreeAtom<NodePayload>;
  createNode: (field: Field<unknown>) => BoardNode;
  $lastActiveNode: AtomMut<BoardNode | null>;
};

export const FieldsManagerContext = createContext<FieldManagerContextInterface>(
  {} as never,
);

export const useFieldsManagerContext = () => useContext(FieldsManagerContext);
