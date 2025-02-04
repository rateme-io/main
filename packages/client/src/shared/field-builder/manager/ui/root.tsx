import { Flex, Text } from '@chakra-ui/react';
import { Portal } from '@chakra-ui/react/portal';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import { restrictToWindowEdges } from '@dnd-kit/modifiers';
import { useEvent } from '@khmilevoi/use-event';
import { reatomComponent } from '@reatom/npm-react';
import { PropsWithChildren } from 'react';

import { Field } from '@/shared/field-builder/field';
import { BoardNode } from '@/shared/field-builder/manager';

import {
  FieldManagerContextInterface,
  FieldsManagerContext,
  useFieldsManagerContext,
} from './context.ts';
import {
  DragData,
  InsertAfterDropData,
  InsertBeforeDropData,
  useActiveField,
  useDrop,
} from './hooks/dnd.ts';
import { snapRightToCursor } from './utils/modifiers.ts';

export type FieldsManagerRootProps = PropsWithChildren<{
  value: FieldManagerContextInterface;
}>;

export const Root = reatomComponent<FieldsManagerRootProps>(
  ({ children, value }) => {
    return (
      <FieldsManagerContext.Provider value={value}>
        <DndContext modifiers={[snapRightToCursor, restrictToWindowEdges]}>
          {children}

          <Overlay />
          <DropLogic />
        </DndContext>
      </FieldsManagerContext.Provider>
    );
  },
  'Root',
);

const DropLogic = reatomComponent(({ ctx }) => {
  const { tree, createNode, $lastActiveNode } = useFieldsManagerContext();

  useDrop(({ dropData, dragData }) => {
    switch (dropData.type) {
      case 'add':
        return handleAdd({ dragData });
      case 'insert-after':
        return handleInsertAfter({ dropData, dragData });
      case 'insert-before':
        return handleInsertBefore({ dropData, dragData });
    }
  });

  const handleAdd = useEvent(({ dragData }: { dragData: DragData }) => {
    if (dragData.type === 'menu') {
      const newNode = createNode(dragData.field);

      $lastActiveNode(ctx, newNode);

      return tree.addChild(ctx, newNode);
    }
  });

  const handleInsertAfter = useEvent(
    ({
      dropData,
      dragData,
    }: {
      dragData: DragData;
      dropData: InsertAfterDropData;
    }) => {
      if (dragData.type === 'menu') {
        const newNode = createNode(dragData.field);

        $lastActiveNode(ctx, newNode);

        return dropData.node.actions.after(ctx, newNode);
      } else if (dragData.type === 'board') {
        dragData.node.actions.detach(ctx);

        $lastActiveNode(ctx, dragData.node);

        return dropData.node.actions.after(ctx, dragData.node);
      } else {
        throw new Error('Unknown dragData type');
      }
    },
  );

  const handleInsertBefore = useEvent(
    ({
      dropData,
      dragData,
    }: {
      dragData: DragData;
      dropData: InsertBeforeDropData;
    }) => {
      if (dragData.type === 'menu') {
        const newNode = createNode(dragData.field);

        $lastActiveNode(ctx, newNode);

        return dropData.node.actions.before(ctx, newNode);
      } else if (dragData.type === 'board') {
        dragData.node.actions.detach(ctx);

        $lastActiveNode(ctx, dragData.node);

        return dropData.node.actions.before(ctx, dragData.node);
      } else {
        throw new Error('Unknown dragData type');
      }
    },
  );

  return null;
}, 'DropLogic');

const Overlay = reatomComponent(() => {
  const { data, active } = useActiveField();

  if (!active || !data) {
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
        <RenderOverlay data={data} />
      </DragOverlay>
    </Portal>
  );
}, 'Overlay');

type RenderOverlayProps = {
  data: DragData;
};

const RenderOverlay = reatomComponent<RenderOverlayProps>(({ data }) => {
  switch (data.type) {
    case 'menu':
      return <MenuOverlay field={data.field} />;
    case 'board':
      return <BoardOverlay node={data.node} />;
  }
}, 'RenderOverlay');

type MenuOverlayProps = {
  field: Field<unknown>;
};

const MenuOverlay = reatomComponent<MenuOverlayProps>(({ field }) => {
  const CustomOverlay = field.ui.MenuItemOverlay;

  if (CustomOverlay) {
    return <CustomOverlay />;
  }

  return <DefaultMenuOverlay field={field} />;
}, 'MenuOverlay');

type DefaultMenuOverlayProps = {
  field: Field<unknown>;
};

const DefaultMenuOverlay = reatomComponent<DefaultMenuOverlayProps>(
  ({ field }) => {
    return (
      <Flex
        zIndex={'max'}
        borderColor={'gray.300'}
        backgroundColor={'gray.100'}
        borderRadius={'md'}
        borderWidth={1}
        borderStyle={'solid'}
        alignItems={'center'}
        paddingInline={2}
        paddingBlock={1}
        gap={2}
      >
        {field.ui.icon} <Text>{field.ui.title}</Text>
      </Flex>
    );
  },
  'DefaultMenuOverlay',
);

type BoardOverlayProps = {
  node: BoardNode;
};

const BoardOverlay = reatomComponent<BoardOverlayProps>(({ node }) => {
  const CustomOverlay = node.field.ui.FieldOverlay;

  if (CustomOverlay) {
    return <CustomOverlay />;
  }

  return <DefaultBoardOverlay node={node} />;
}, 'BoardOverlay');

type DefaultBoardOverlayProps = {
  node: BoardNode;
};

const DefaultBoardOverlay = reatomComponent<DefaultBoardOverlayProps>(
  ({ ctx, node }) => {
    return (
      <Flex
        zIndex={'max'}
        borderColor={'gray.300'}
        backgroundColor={'gray.100'}
        borderRadius={'md'}
        borderWidth={1}
        borderStyle={'solid'}
        alignItems={'center'}
        paddingInline={2}
        paddingBlock={1}
        gap={2}
      >
        {node.field.ui.icon}{' '}
        <Text>{ctx.get(node.$name).trim() || node.field.ui.title}</Text>
      </Flex>
    );
  },
  'DefaultBoardOverlay',
);
