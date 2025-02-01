import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { createContext, useContext } from 'react';

export type FieldContextInterface = {
  setNodeRef?: (node: HTMLElement | null) => void;
  setActivatorNodeRef?: (node: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
  isDragging?: boolean;
  isOverlay?: boolean;
};

const FieldContext = createContext<FieldContextInterface>({});

export const FieldContextProvider = FieldContext.Provider;

export const useFieldContext = () => useContext(FieldContext);
