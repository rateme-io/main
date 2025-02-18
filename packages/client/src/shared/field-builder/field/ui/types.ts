import { ReactNode } from 'react';

import { FieldIssueManager } from '@/shared/field-builder/field';

export type CreateFieldUICommand<BuilderState> = {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  comingSoon?: boolean;
  FieldContent: (props: FieldContentProps<BuilderState>) => ReactNode;
  FieldOverlay?: (props: FieldOverlayProps) => ReactNode;
  MenuItemOverlay?: (props: MenuItemOverlayProps) => ReactNode;
  FieldPreview: (props: FieldPreviewProps<BuilderState>) => ReactNode;
};

export type FieldContentProps<State> = {
  builderState: State;
  issueManager: FieldIssueManager;
};

export type FieldPreviewProps<State> = {
  builderState: State;
};

export type FieldOverlayProps = object;

export type MenuItemOverlayProps = object;

export type FieldUI<State> = {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  comingSoon?: boolean;
  FieldContent: (props: FieldContentProps<State>) => ReactNode;
  FieldOverlay?: (props: FieldOverlayProps) => ReactNode;
  MenuItemOverlay?: (props: MenuItemOverlayProps) => ReactNode;
  FieldPreview: (props: FieldPreviewProps<State>) => ReactNode;
};
