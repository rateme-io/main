import { NodeAtom, NodeBuilder } from '@/shared/node-builder';

export type FieldNodes<Config extends FieldBuilderConfig> = {
  [Type in keyof Config]: FieldNode<Config, Type>;
}[keyof Config];

export type FieldNode<
  Config extends FieldBuilderConfig,
  Type extends keyof Config,
> = NodeAtom<
  FieldNodePayload<Type, InferFields<Config>[Type]['state']>,
  FieldNodePayloads<Config>
>;

export type FieldNodePayloads<
  Config extends FieldBuilderConfig,
  Types extends keyof Config = keyof Config,
> = {
  [Key in Types]: FieldNodePayload<Key, InferFields<Config>[Key]['state']>;
}[Types];

export type FieldNodePayload<Type, State> = {
  type: Type;
  state: State;
};

export type FieldBuilderConfig = {
  [key: string]: {
    payload?: object;
    hasChildren?: boolean;
    state: () => Record<string, unknown>;
  };
};

export type InferFields<T extends FieldBuilderConfig> = {
  [K in keyof T]: {
    type: K;
    state: ReturnType<T[K]['state']>;
  };
};

export type InferFieldTypes<T extends FieldBuilderConfig> = Extract<
  keyof T,
  string
>;

export type FieldBuilder<Config extends FieldBuilderConfig> = {
  createField: <Type extends InferFieldTypes<Config>>(
    type: Type,
  ) => { [Key in Type]: FieldNode<Config, Key> }[Type];
} & NodeBuilder<FieldNodePayloads<Config>>;
