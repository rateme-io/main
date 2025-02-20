import { PreviewModel } from './types';
import { PreviewUI } from './ui';

export type CreatePreviewCommand<BuilderState, PreviewState> = {
  model: PreviewModel<PreviewState>;
  ui: PreviewUI<BuilderState, PreviewState>;
};

export type Preview<BuilderState, PreviewState> = {
  model: PreviewModel<PreviewState>;
  ui: PreviewUI<BuilderState, PreviewState>;
};

export const createPreview = <BuilderState, PreviewState>({
  model,
  ui,
}: CreatePreviewCommand<BuilderState, PreviewState>): Preview<
  BuilderState,
  PreviewState
> => {
  return {
    model,
    ui,
  };
};

export * from './model';
export * from './types';
export * from './ui';
