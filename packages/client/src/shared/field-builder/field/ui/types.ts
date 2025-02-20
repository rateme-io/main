import { ReactNode } from 'react';

import { FieldIssueManager } from '@/shared/field-builder/field';

export type CreateFieldUICommand<BuilderState> = {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  comingSoon?: boolean;
  BuilderContent: (props: BuilderContentProps<BuilderState>) => ReactNode;
  BuilderOverlay?: (props: BuilderOverlayProps) => ReactNode;
  MenuItemOverlay?: (props: MenuItemOverlayProps) => ReactNode;
  FieldEditor: (props: FieldEditorProps<BuilderState>) => ReactNode;
  FieldPreview: (props: FieldPreviewProps<BuilderState>) => ReactNode;
};

export type BuilderContentProps<State> = {
  builderState: State;
  issueManager: FieldIssueManager;
};

export type FieldEditorProps<State> = {
  builderState: State;
};

export type FieldPreviewProps<State> = {
  builderState: State;
};

export type BuilderOverlayProps = object;

export type MenuItemOverlayProps = object;

export type FieldUI<BuilderState> = {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  comingSoon?: boolean;
  BuilderContent: (props: BuilderContentProps<BuilderState>) => ReactNode;
  BuilderOverlay?: (props: BuilderOverlayProps) => ReactNode;
  MenuItemOverlay?: (props: MenuItemOverlayProps) => ReactNode;
  FieldEditor: (props: FieldEditorProps<BuilderState>) => ReactNode;
  FieldPreview: (props: FieldPreviewProps<BuilderState>) => ReactNode;
};
