import { nodeBuilder } from '@/shared/node-builder';
import { generateId } from '@/shared/utils/generate-id.ts';

import {
  FieldBuilder,
  FieldBuilderConfig,
  FieldNode,
  FieldNodePayloads,
  InferFields,
  InferFieldTypes,
} from './types.ts';

export const fieldBuilder = <Config extends FieldBuilderConfig>(
  config: Config,
  { name }: { name: string },
): FieldBuilder<Config> => {
  const builder = nodeBuilder<FieldNodePayloads<Config>>(`${name}.builder`);

  const createField = <Type extends InferFieldTypes<Config>>(
    type: Type,
  ): FieldNode<Config, Type> => {
    const fieldConfig = config[type];

    const state = fieldConfig.state() as InferFields<Config>[Type]['state'];

    const id = generateId();

    const node = builder.createNode(
      {
        id,
        type: type,
        state,
      },
      `${name}.${type}.${id.slice(0, 5)}`,
    );

    return {
      id: node.id,
      type,
      nodes: node.nodes,
      state,
      actions: node.actions,
    };
  };

  return {
    ...builder,
    createField,
  };
};
