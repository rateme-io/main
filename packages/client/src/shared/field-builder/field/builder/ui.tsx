import { ReactNode } from 'react';

import { IssueManager } from '@/shared/issue-manager';

export type BuilderContentProps<BuilderState> = {
  builderState: BuilderState;
  issueManager: IssueManager;
};

export type BuilderEditorProps<BuilderState> = {
  builderState: BuilderState;
};

export type BuilderOverlayProps = object;

export type BuilderUI<BuilderState> = {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  BuilderContent: (props: BuilderContentProps<BuilderState>) => ReactNode;
  BuilderOverlay?: (props: BuilderOverlayProps) => ReactNode;
  FieldEditor: (props: BuilderEditorProps<BuilderState>) => ReactNode;
};

export type CreateBuilderUICommand<BuilderState> = BuilderUI<BuilderState>;

export const createBuilderUI = <BuilderState,>({
  ...rest
}: CreateBuilderUICommand<BuilderState>): BuilderUI<BuilderState> => {
  return {
    ...rest,
  };
};
