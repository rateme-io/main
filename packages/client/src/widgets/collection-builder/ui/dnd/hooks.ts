import { useDndMonitor, useDraggable, useDroppable } from '@dnd-kit/core';
import { useAtom } from '@reatom/npm-react';

import { FieldInfo } from '../../fields-info';
import { CollectionFields } from '../../model';
import { DraggableData } from './types';

export const useDraggableMenuItem = ({ info }: { info: FieldInfo }) => {
  return useDraggable({
    id: `drag-menu-${info.type}`,
    data: {
      type: 'menu',
      info,
    } satisfies DraggableData,
  });
};

export const useDraggableBoardItem = ({ node }: { node: CollectionFields }) => {
  return useDraggable({
    id: `drag-board-${node.id}`,
    data: {
      type: 'board',
      node: node,
    } satisfies DraggableData,
  });
};

export const useDragging = () => {
  const [dragData, setDragData] = useAtom<DraggableData | null>(null);

  useDndMonitor({
    onDragStart(event) {
      setDragData(event.active.data.current as DraggableData);
    },
    onDragEnd() {
      setDragData(null);
    },
  });

  return dragData;
};

export const useDroppableBoardItem = ({
  node,
  isLast,
  forParent,
}: {
  node: CollectionFields;
  isLast?: boolean;
  forParent?: boolean;
}) => {
  const { active, over, ...rest } = useDroppable({
    id: `${isLast ? 'after' : 'before'}-drop-board-${node.id}-${forParent ? 'parent' : 'child'}`,
  });

  return {
    activeData: (active?.data.current ?? null) as DraggableData | null,
    overData: (over?.data.current ?? null) as DraggableData | null,
    active,
    over,
    ...rest,
  };
};
