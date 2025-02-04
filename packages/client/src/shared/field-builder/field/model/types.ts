import { AtomMut } from '@reatom/framework';

export type CreateFieldModelCommand<State> = {
  state: (command: CreateStateCommand) => State;
};

export type FieldModel<State> = {
  create: (command: CreateStateCommand) => State;
};

export type CreateStateCommand = {
  $name: AtomMut<string>;
};

export type InferState<Model> =
  Model extends FieldModel<infer State> ? State : never;
