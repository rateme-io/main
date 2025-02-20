import { AtomMut } from '@reatom/framework';

import { NodeAtom } from '@/shared/atoms/tree-atom';
import {
  BuilderInstance,
  Field,
  PreviewInstance,
} from '@/shared/field-builder/field';
import { FieldGroup } from '@/shared/field-builder/group';

export type CreateFieldsManagerCommand = {
  groups: FieldGroup[];
};

export type BoardNode<
  BuilderState = unknown,
  PreviewState = unknown,
> = NodeAtom<NodePayload<BuilderState, PreviewState>>;

export type NodePayload<BuilderState = unknown, PreviewState = unknown> = {
  field: Field<BuilderState, PreviewState>;
  $name: AtomMut<string>;
  builder: BuilderInstance<BuilderState>;
  preview: PreviewInstance<PreviewState>;
};
