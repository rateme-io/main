import { Action, AtomMut } from '@reatom/framework';

export type CreateFieldModelCommand<State> = {
  state: (command: CreateStateCommand) => State;
  validate?: Action<[api: FieldValidationApi<State>], void>;
};

export type FieldValidationApi<State> = {
  state: State;
  addIssue: (issue: FieldIssue) => void;
  validateName: (name: string) => void;
};

export type FieldIssue = {
  type: 'warning' | 'critical';
  id: symbol;
  message?: string;
};

export type FieldModel<State> = {
  create: (command: CreateStateCommand) => FieldInstance<State>;
};

export type FieldInstance<State> = {
  state: State;
  issueManager: FieldIssueManager;
};

export type FieldIssueManager = {
  getIssue(id: symbol): FieldIssue | null;
  getIssues(): FieldIssue[];
  validate: Action<[], boolean>;
};

export type CreateStateCommand = {
  $name: AtomMut<string>;
};

export type InferState<Model> =
  Model extends FieldModel<infer State> ? State : never;
