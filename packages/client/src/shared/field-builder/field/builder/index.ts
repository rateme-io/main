import { BuilderModel } from './types';
import { BuilderUI } from './ui';

export type CreateBuilderCommand<State> = {
  model: BuilderModel<State>;
  ui: BuilderUI<State>;
};

export type Builder<State> = {
  model: BuilderModel<State>;
  ui: BuilderUI<State>;
};

export const createBuilder = <State>({
  model,
  ui,
}: CreateBuilderCommand<State>): Builder<State> => {
  return {
    model,
    ui,
  };
};

export * from './model';
export * from './types';
export * from './ui';
