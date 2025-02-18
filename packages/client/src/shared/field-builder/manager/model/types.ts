import { AtomMut } from '@reatom/framework';

import { NodeAtom } from '@/shared/atoms/tree-atom';
import { Field, FieldBuilderInstance } from '@/shared/field-builder/field';
import { FieldGroup } from '@/shared/field-builder/group';

export type CreateFieldsManagerCommand = {
  groups: FieldGroup[];
};

export type BoardNode<State = unknown> = NodeAtom<NodePayload<State>>;

export type NodePayload<State = unknown> = {
  field: Field<State>;
  $name: AtomMut<string>;
} & FieldBuilderInstance<State>;
