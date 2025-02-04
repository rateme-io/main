import { CreateStateCommand, FieldModel } from './model';
import { FieldUI } from './ui';

export type CreateFieldCommand<State> = {
  name: string;
  model: FieldModel<State>;
  ui: FieldUI<State>;
};

export type Field<State> = {
  id: string;
  ui: FieldUI<State>;
  create: (command: CreateStateCommand) => {
    id: string;
    state: State;
  };
};
