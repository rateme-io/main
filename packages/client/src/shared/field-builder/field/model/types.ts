import { Action, Atom, AtomMut } from '@reatom/framework';

import { IssueManager, ValidationApi } from '@/shared/issue-manager';

export type CreateFieldModelCommand<State> = {
  builderState: (command: FieldBuilderCommand) => State;
  validateField?: Action<[api: FieldValidationApi<State>], void>;
};

export type FieldBuilderCommand = {
  $name: Atom<string>;
};

export type FieldBuilderInstance<State> = {
  state: State;
  issueManager: IssueManager;
};

export type FieldModel<State> = {
  createBuilder: (command: FieldBuilderCommand) => FieldBuilderInstance<State>;
};

export type FieldValidationApi<State> = {
  state: State;
  validateName: Action<[name: string], void>;
} & ValidationApi;

export type FieldIssue = {
  type: 'warning' | 'critical';
  id: symbol;
  key?: string;
  message?: string;
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
