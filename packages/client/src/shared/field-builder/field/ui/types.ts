import { ReactNode } from 'react';

export type CreateFieldUICommand<State> = {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  FieldContent: (props: FieldContentProps<State>) => ReactNode;
  FieldOverlay?: (props: FieldOverlayProps) => ReactNode;
  MenuItemOverlay?: (props: MenuItemOverlayProps) => ReactNode;
};

export type FieldContentProps<State> = {
  state: State;
};

export type FieldOverlayProps = object;

export type MenuItemOverlayProps = object;

export type FieldUI<State> = {
  title: ReactNode;
  description: ReactNode;
  icon: ReactNode;
  FieldContent: (props: FieldContentProps<State>) => ReactNode;
  FieldOverlay?: (props: FieldOverlayProps) => ReactNode;
  MenuItemOverlay?: (props: MenuItemOverlayProps) => ReactNode;
};
