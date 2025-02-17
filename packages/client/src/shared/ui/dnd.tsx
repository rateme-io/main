import { Active, Over } from '@dnd-kit/core';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { Transform } from '@dnd-kit/utilities';
import { createContext, PropsWithChildren, use } from 'react';

import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

type DraggableValue = {
  listeners: SyntheticListenerMap | undefined;
  attributes: DraggableAttributes;
  isDragging: boolean;
  active: Active | null;
  over: Over | null;
  setNodeRef: (element: HTMLElement | null) => void;
  setActivatorNodeRef: (element: HTMLElement | null) => void;
  transform: Transform | null;
};

type DraggableProps = PropsWithChildren<{
  value: DraggableValue;
}>;

export const Draggable = reatomMemo<DraggableProps>(({ children, value }) => {
  return (
    <DraggableContext.Provider value={value}>
      {children}
    </DraggableContext.Provider>
  );
}, 'Draggable');

export const useDraggableContext = () => {
  const value = use(DraggableContext);

  if (value === null) {
    throw new Error(
      'useDraggableContext must be used within a Draggable component',
    );
  }

  return value;
};

const DraggableContext = createContext<DraggableValue | null>(null);
