export type CreateFieldModelCommand<State> = {
  state: () => State;
};

export type FieldModel<State> = {
  create: () => State;
};

export type InferState<Model> =
  Model extends FieldModel<infer State> ? State : never;
