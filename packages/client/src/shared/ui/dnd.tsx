import { useDraggable } from '@dnd-kit/core';
import { reatomComponent } from '@reatom/npm-react';
import { createContext, PropsWithChildren, useContext } from 'react';

type DraggableProps = PropsWithChildren<{
  value: ReturnType<typeof useDraggable>;
}>;

export const Draggable = reatomComponent<DraggableProps>(
  ({ children, value }) => {
    return (
      <DraggableContext.Provider value={value}>
        {children}
      </DraggableContext.Provider>
    );
  },
  'Draggable',
);

export const useDraggableContext = () => {
  return useContext(DraggableContext);
};

const DraggableContext = createContext<ReturnType<typeof useDraggable> | null>(
  null,
);
