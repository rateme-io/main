import { useDraggable } from '@dnd-kit/core';
import { createContext, PropsWithChildren, useContext } from 'react';

import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

type DraggableProps = PropsWithChildren<{
  value: ReturnType<typeof useDraggable>;
}>;

export const Draggable = reatomMemo<DraggableProps>(({ children, value }) => {
  return (
    <DraggableContext.Provider value={value}>
      {children}
    </DraggableContext.Provider>
  );
}, 'Draggable');

export const useDraggableContext = () => {
  return useContext(DraggableContext);
};

const DraggableContext = createContext<ReturnType<typeof useDraggable> | null>(
  null,
);
