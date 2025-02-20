import { ReactNode } from 'react';

export type PreviewProps<BuilderState, PreviewState> = {
  builderState: BuilderState;
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
  Preview: (props: PreviewProps<BuilderState, PreviewState>) => ReactNode;
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
