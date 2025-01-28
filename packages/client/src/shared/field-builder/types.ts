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
