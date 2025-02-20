import { Action, Atom, AtomMut, Ctx } from '@reatom/framework';

export type CreateFieldModelCommand<State> = {
  builderState: (command: CreateStateCommand) => State;
  validateField?: (ctx: Ctx, api: FieldValidationApi<State>) => void;
};

export type FieldValidationApi<State> = {
  state: State;
  addIssue: Action<[issue: FieldIssue], void>;
  validateName: Action<[name: string], void>;
};

export type FieldIssue = {
  type: 'warning' | 'critical';
  id: symbol;
  key?: string;
  message?: string;
};

export type FieldModel<State> = {
  createBuilder: (command: CreateStateCommand) => FieldBuilderInstance<State>;
};

export type FieldBuilderInstance<State> = {
  state: State;
  issueManager: FieldIssueManager;
};

export type FieldIssueManager = {
  getIssue: Action<[id: symbol, key?: string], FieldIssue | null>;
  issueAtom: (id: symbol, key?: string) => Atom<FieldIssue | null>;
  validate: Action<[], boolean>;
  revalidate: Action<[], boolean>;
};

export type CreateStateCommand = {
  $name: AtomMut<string>;
};

export type InferBuilderState<Model> =
  Model extends FieldModel<infer State> ? State : never;
