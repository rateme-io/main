import { Action, Atom, AtomMut } from '@reatom/framework';

export type CreateFieldModelCommand<State> = {
  state: (command: CreateStateCommand) => State;
  validateField?: Action<[api: FieldValidationApi<State>], void>;
};

export type FieldValidationApi<State> = {
  state: State;
  addIssue: Action<[issue: FieldIssue], void>;
  validateName: Action<[name: string], void>;
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
  getIssue: Action<[id: symbol], FieldIssue | null>;
  issueAtom: (id: symbol) => Atom<FieldIssue | null>;
  validate: Action<[], boolean>;
};

export type CreateStateCommand = {
  $name: AtomMut<string>;
};

export type InferState<Model> =
  Model extends FieldModel<infer State> ? State : never;
