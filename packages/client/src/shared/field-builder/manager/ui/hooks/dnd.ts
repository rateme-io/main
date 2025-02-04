import {
  Active,
  DataRef,
  Over,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';
import { useState } from 'react';

import { Field } from '@/shared/field-builder/field';
import { BoardNode } from '@/shared/field-builder/manager';

export type DragData =
  | {
      type: 'menu';
      field: Field<unknown>;
    }
  | {
      type: 'board';
      node: BoardNode;
    };

export type DropData = AddDropData | InsertAfterDropData | InsertBeforeDropData;

export type AddDropData = { type: 'add' };
export type InsertAfterDropData = {
  type: 'insert-after';
  node: BoardNode;
};
export type InsertBeforeDropData = {
  type: 'insert-before';
  node: BoardNode;
};

export type CustomActive = Active & { data: DataRef<DragData> | null };
export type CustomOver = Over & { data: DataRef<DropData> | null };

export const useDraggableField = (
  data: DragData,
  { disabled }: { disabled?: boolean } = {},
) => {
  const createId = () => {
    switch (data.type) {
      case 'menu':
        return `menu-${data.field.id}`;
      case 'board':
        return `board-${data.node.id}`;
    }
  };

  return useDraggable({
    id: createId(),
    data: data,
    disabled,
  });
};

export const useDroppableZone = (data: DropData) => {
  const createId = () => {
    switch (data.type) {
      case 'add':
        return 'add';
      case 'insert-after':
        return `insert-after-${data.node.id}`;
      case 'insert-before':
        return `insert-before-${data.node.id}`;
    }
  };

  const { active, over, ...rest } = useDroppable({
    id: createId(),
    data: data,
  });

  return {
    ...rest,
    active: active as CustomActive,
    over: over as CustomOver,
  };
};

export const useActiveField = () => {
  const [active, setActive] = useState<CustomActive | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setActive(event.active as CustomActive);
    },
    onDragEnd: () => {
      setActive(null);
    },
  });

  return {
    active,
    data: active?.data?.current ?? null,
  };
};

export type DropPayload = {
  dragData: DragData;
  dropData: DropData;
};

export const useDrop = (callback: (dropPayload: DropPayload) => void) => {
  useDndMonitor({
    onDragEnd(event) {
      const dragData = event.active.data.current;
      const dropData = event.over?.data.current;

      if (dragData && dropData) {
        callback({
          dragData: dragData as DragData,
          dropData: dropData as DropData,
        });
      }
    },
  });
};
