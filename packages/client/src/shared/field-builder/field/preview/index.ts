import { PreviewModel } from './types';
import { PreviewUI } from './ui';

export type CreatePreviewCommand<PreviewState> = {
  model: PreviewModel<PreviewState>;
  ui: PreviewUI<PreviewState>;
};

export type Preview<PreviewState> = {
  model: PreviewModel<PreviewState>;
  ui: PreviewUI<PreviewState>;
};

export const createPreview = <PreviewState>({
  model,
  ui,
}: CreatePreviewCommand<PreviewState>): Preview<PreviewState> => {
  return {
    model,
    ui,
  };
};

export * from './model';
export * from './types';
export * from './ui';
