import { Flex, Text } from '@chakra-ui/react';
import { Portal } from '@chakra-ui/react/portal';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { PropsWithChildren, useMemo } from 'react';

import { FieldBuilderModel } from '@/shared/field-builder/manager/model';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import {
  FieldBuilderContext,
  FieldBuilderContextInterface,
  useFieldBuilderContext,
} from './context.ts';
import {
  BoardDragData,
  DragData,
  DropData,
  MenuDragData,
  useActiveField,
  useDrop,
} from './hooks/dnd.ts';
import { conditionalCollisionDetection } from './utils/collision-detections.ts';
import { snapRightToCursor } from './utils/modifiers.ts';

export type FieldsManagerRootProps = PropsWithChildren<{
  value: FieldBuilderModel;
}>;

export const Root = reatomMemo<FieldsManagerRootProps>(
  ({ children, value }) => {
    const context = useMemo<FieldBuilderContextInterface>(() => {
      return {
        model: value,
      };
    }, [value]);

    return (
      <FieldBuilderContext.Provider value={context}>
        <DndContext
          modifiers={[snapRightToCursor, restrictToWindowEdges]}
          collisionDetection={conditionalCollisionDetection}
        >
          {children}

          <Overlay />
          <DropLogic />
        </DndContext>
      </FieldBuilderContext.Provider>
    );
  },
  'Root',
);

const DropLogic = reatomMemo(({ ctx }) => {
  const { model } = useFieldBuilderContext();

  useDrop(({ dropData, dragData }) => {
    if (dropData.type === 'add') {
      if (dragData.type === 'menu') {
        return model.actions.addChild(ctx, dragData.field);
      }
    } else if (dropData.type === 'insert-after') {
      if (dragData.type === 'menu') {
        return model.actions.insertAfter(ctx, dropData.node, dragData.field);
      } else if (dragData.type === 'board') {
        return model.actions.moveAfter(ctx, dropData.node, dragData.node);
      }
    } else if (dropData.type === 'insert-before') {
      if (dragData.type === 'menu') {
        return model.actions.insertBefore(ctx, dropData.node, dragData.field);
      } else if (dragData.type === 'board') {
        return model.actions.moveBefore(ctx, dropData.node, dragData.node);
      }
    } else if (dropData.type === 'cancel') {
      return;
    }

    throw new Error('Unknown operation');
  });

  return null;
}, 'DropLogic');

const Overlay = reatomMemo(() => {
  const { activeData, overData } = useActiveField();

  if (!activeData) {
    return null;
  }

  return (
    <Portal>
      <DragOverlay
        style={{
          width: 'auto',
          height: 'auto',
        }}
        dropAnimation={null}
      >
        <RenderOverlay data={activeData} overData={overData} />
      </DragOverlay>
    </Portal>
  );
}, 'Overlay');

type RenderOverlayProps = {
  data: DragData;
  overData: DropData | null;
};

const RenderOverlay = reatomMemo<RenderOverlayProps>(({ data, overData }) => {
  switch (data.type) {
    case 'menu':
      return <MenuOverlay data={data} overData={overData} />;
    case 'board':
      return <BoardOverlay data={data} overData={overData} />;
  }
}, 'RenderOverlay');

type MenuOverlayProps = {
  data: MenuDragData;
  overData: DropData | null;
};

const MenuOverlay = reatomMemo<MenuOverlayProps>(({ data, overData }) => {
  const CustomOverlay = data.field.ui.MenuItemOverlay;

  if (CustomOverlay) {
    return <CustomOverlay />;
  }

  return <DefaultMenuOverlay data={data} overData={overData} />;
}, 'MenuOverlay');

type DefaultMenuOverlayProps = {
  data: MenuDragData;
  overData: DropData | null;
};

const DefaultMenuOverlay = reatomMemo<DefaultMenuOverlayProps>(({ data }) => {
  return (
    <Flex
      zIndex={'max'}
      borderColor={'border.emphasized'}
      backgroundColor={'bg.muted'}
      borderRadius={'md'}
      borderWidth={1}
      borderStyle={'solid'}
      alignItems={'center'}
      paddingInline={2}
      paddingBlock={1}
      gap={2}
    >
      {data.field.ui.icon} <Text>{data.field.ui.title}</Text>
    </Flex>
  );
}, 'DefaultMenuOverlay');

type BoardOverlayProps = {
  data: BoardDragData;
  overData: DropData | null;
};

const BoardOverlay = reatomMemo<BoardOverlayProps>(({ data, overData }) => {
  const CustomOverlay = data.node.field.ui.BuilderOverlay;

  if (CustomOverlay) {
    return <CustomOverlay />;
  }

  return <DefaultBoardOverlay data={data} overData={overData} />;
}, 'BoardOverlay');

type DefaultBoardOverlayProps = {
  data: BoardDragData;
  overData: DropData | null;
};

const DefaultBoardOverlay = reatomMemo<DefaultBoardOverlayProps>(
  ({ ctx, data, overData }) => {
    return (
      <Flex
        zIndex={'max'}
        borderColor={'border.emphasized'}
        backgroundColor={'bg.muted'}
        borderRadius={'md'}
        borderWidth={1}
        borderStyle={'solid'}
        alignItems={'center'}
        paddingInline={2}
        paddingBlock={1}
        gap={2}
        transition={'opacity 0.2s'}
        opacity={overData?.type === 'cancel' ? 0.5 : 1}
      >
        {data.node.field.ui.icon}
        <Text>
          {ctx.get(data.node.$name).trim() || data.node.field.ui.title}
        </Text>
      </Flex>
    );
  },
  'DefaultBoardOverlay',
);
