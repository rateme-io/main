import { Action, AtomMut, Ctx } from '@reatom/framework';

import { IssueManager, ValidationApi } from '@/shared/issue-manager';

export type CreateBuilderModelCommand<BuilderState> = {
  state: (command: BuilderCommand) => BuilderState;
  validate?: (ctx: Ctx, api: BuilderValidationApi<BuilderState>) => void;
};

export type BuilderCommand = {
  $name: AtomMut<string>;
};

export type BuilderInstance<BuilderState> = {
  state: BuilderState;
  issueManager: IssueManager;
};

export type BuilderModel<BuilderState> = {
  create: (command: BuilderCommand) => BuilderInstance<BuilderState>;
};

export type BuilderValidationApi<BuilderState> = {
  state: BuilderState;
  validateName: Action<[name: string], void>;
} & ValidationApi;

export type InferBuilderState<Model> =
  Model extends BuilderModel<infer State> ? State : never;
