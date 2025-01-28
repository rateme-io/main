import { action } from '@reatom/framework';

import {
  FieldBuilderConfig,
  InferFields,
  InferFieldTypes,
} from '@/shared/field-builder/types.ts';
import { createNode, NodeAtom, nodeBuilder } from '@/shared/node-builder';
import { Merge } from '@/shared/types/merge.ts';
import { generateId } from '@/shared/utils/generate-id.ts';

export const fieldBuilder = <Config extends FieldBuilderConfig>(
  config: Config,
  { name }: { name: string },
) => {
  const tree = nodeBuilder<FieldNodePayloads<Config>>(`${name}.tree`);

  const createField = <Type extends InferFieldTypes<Config>>(
    type: Type,
  ): FieldNode<Config, Type> => {
    const fieldConfig = config[type];

    const state = fieldConfig.state() as InferFields<Config>[Type]['state'];

    const node = createNode<FieldNodePayloads<Config>>(
      {
        id: generateId(),
        payload: {
          type: type,
          state,
        },
      },
      type,
    );

    return {
      ...node,
      payload: node.payload as FieldNodePayloads<Config, Type>,
      actions: {
        ...node.actions,
        addChild: action((ctx, child: FieldNode<Config>) => {
          if (!fieldConfig.hasChildren) {
            return false;
          }

          node.actions.addChild(ctx, child);

          return true;
        }, `${name}.addChild`),
      },
    };
  };

  return { createField, root: tree.root };
};

export type FieldNode<
  Config extends FieldBuilderConfig,
  Types extends keyof Config = keyof Config,
> = {
  [Key in Types]: Merge<
    {
      payload: FieldNodePayloads<Config, Key>;
    },
    NodeAtom<FieldNodePayloads<Config>>
  >;
}[Types];

export type FieldNodePayloads<
  Config extends FieldBuilderConfig,
  Types extends keyof Config = keyof Config,
> = {
  [Key in Types]: FieldNodePayload<Key, InferFields<Config>[Key]['state']>;
}[Types];

type FieldNodePayload<Type, State> = {
  type: Type;
  state: State;
};
