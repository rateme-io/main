import { ReactNode } from 'react';

export type PreviewProps<PreviewState> = {
  previewState: PreviewState;
};

export type PreviewUI<PreviewState> = {
  Preview: (props: PreviewProps<PreviewState>) => ReactNode;
};

export type CreatePreviewUICommand<PreviewState> = PreviewUI<PreviewState>;

export const createPreviewUI = <PreviewState,>({
  ...rest
}: CreatePreviewUICommand<PreviewState>): PreviewUI<PreviewState> => {
  return {
    ...rest,
  };
};
