import { AtomMut } from '@reatom/framework';

import { NodeAtom } from '@/shared/atoms/tree-atom';
import { Field, FieldBuilderInstance } from '@/shared/field-builder/field';
import { FieldGroup } from '@/shared/field-builder/group';

export type CreateFieldsManagerCommand = {
  groups: FieldGroup[];
};

export type BoardNode = NodeAtom<NodePayload>;

export type NodePayload = {
  field: Field<unknown>;
  $name: AtomMut<string>;
} & FieldBuilderInstance<unknown>;
