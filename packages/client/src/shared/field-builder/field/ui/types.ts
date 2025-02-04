import { ReactNode } from 'react';

export type CreateFieldUICommand<State> = {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  comingSoon?: boolean;
  FieldContent: (props: FieldContentProps<State>) => ReactNode;
  FieldOverlay?: (props: FieldOverlayProps) => ReactNode;
  MenuItemOverlay?: (props: MenuItemOverlayProps) => ReactNode;
  FieldPreview: (props: FieldPreviewProps<State>) => ReactNode;
};

export type FieldContentProps<State> = {
  state: State;
};

export type FieldPreviewProps<State> = {
  state: State;
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
