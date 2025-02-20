import { ReactNode } from 'react';

export type PreviewProps<PreviewState> = {
  previewState: PreviewState;
};

export type PreviewEditorProps<BuilderState, PreviewState> = {
  builderState: BuilderState;
  previewState: PreviewState;
};

export type PreviewUI<BuilderState, PreviewState> = {
  PreviewEditor: (
    props: PreviewEditorProps<BuilderState, PreviewState>,
  ) => ReactNode;
  Preview: (props: PreviewProps<PreviewState>) => ReactNode;
};

export type CreatePreviewUICommand<BuilderState, PreviewState> = PreviewUI<
  BuilderState,
  PreviewState
>;

export const createPreviewUI = <BuilderState, PreviewState>({
  ...rest
}: CreatePreviewUICommand<BuilderState, PreviewState>): PreviewUI<
  BuilderState,
  PreviewState
> => {
  return {
    ...rest,
  };
};
