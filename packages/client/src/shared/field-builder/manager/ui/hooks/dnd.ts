import {
  Active,
  DataRef,
  Over,
  useDndContext,
  useDndMonitor,
  useDraggable,
  useDroppable,
} from '@dnd-kit/core';

import { Field } from '@/shared/field-builder/field';

import { BoardNode } from '../../model';

export type DragData = MenuDragData | BoardDragData;

export type MenuDragData = { type: 'menu'; field: Field<unknown, unknown> };
export type BoardDragData = { type: 'board'; node: BoardNode };

export type DropData =
  | AddDropData
  | InsertAfterDropData
  | InsertBeforeDropData
  | CancelDropData;

export type AddDropData = { type: 'add' };
export type InsertAfterDropData = {
  type: 'insert-after';
  node: BoardNode;
};
export type InsertBeforeDropData = {
  type: 'insert-before';
  node: BoardNode;
};
export type CancelDropData = {
  type: 'cancel';
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
      case 'cancel':
        return `cancel-${data.node.id}`;
    }
  };

  const { active, over, ...rest } = useDroppable({
    id: createId(),
    data: data,
  });

  return {
    ...rest,
    active: active as CustomActive | null,
    over: over as CustomOver | null,
  };
};

export const useActiveField = () => {
  const context = useDndContext();

  const active = context.active as CustomActive | null;
  const over = context.over as CustomOver | null;

  return {
    active,
    activeData: active?.data?.current ?? null,
    over,
    overData: over?.data?.current ?? null,
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
