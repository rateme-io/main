import { Flex } from '@chakra-ui/react';
import { useDndMonitor } from '@dnd-kit/core';
import { reatomComponent } from '@reatom/npm-react';
import { useMemo } from 'react';

import { FieldInfo } from '@/widgets/collection-builder/fields-info.tsx';
import {
  collectionBuilder,
  CollectionFields,
} from '@/widgets/collection-builder/model';
import { FieldContextProvider } from '@/widgets/collection-builder/ui/board/context.ts';
import { GroupField } from '@/widgets/collection-builder/ui/board/fields/group-field.tsx';
import { TextField } from '@/widgets/collection-builder/ui/board/fields/text-field.tsx';
import {
  useDraggableBoardItem,
  useDroppableBoardItem,
} from '@/widgets/collection-builder/ui/dnd/hooks.ts';

type FieldRendererProps = {
  node: CollectionFields;
  forParent?: boolean;
};

export const FieldRenderer = reatomComponent<FieldRendererProps>(({ node }) => {
  switch (node.type) {
    case 'text':
      return <TextField node={node} />;
    case 'group':
      return <GroupField node={node} />;
  }
}, 'FieldRenderer');

export const DraggableFieldRenderer = reatomComponent<FieldRendererProps>(
  ({ node, ctx, forParent }) => {
    const {
      setNodeRef,
      setActivatorNodeRef,
      listeners,
      attributes,
      isDragging,
    } = useDraggableBoardItem({ node: node });

    const context = useMemo(
      () => ({
        setNodeRef,
        setActivatorNodeRef,
        listeners,
        attributes,
        isDragging,
      }),
      [setNodeRef, setActivatorNodeRef, listeners, attributes, isDragging],
    );

    const next = ctx.spy(node.nodes.$next);

    return (
      <FieldContextProvider value={context}>
        <DropFieldZone node={node} forParent={forParent} />
        {!forParent && <FieldRenderer node={node} />}
        {!next && !forParent && <DropFieldZone node={node} isLast />}
      </FieldContextProvider>
    );
  },
  'DraggableFieldRenderer',
);

export type DropFieldZoneProps = {
  node: CollectionFields;
  isLast?: boolean;
  forParent?: boolean;
};

export const DropFieldZone = reatomComponent<DropFieldZoneProps>(
  ({ node, isLast, forParent }) => {
    const { activeData, isOver, setNodeRef } = useDroppableBoardItem({
      node: node,
      forParent,
      isLast,
    });

    switch (activeData?.type) {
      case 'menu':
        return (
          <AddDropZone
            isOver={isOver}
            activeInfo={activeData.info}
            node={node}
            setNodeRef={setNodeRef}
            isLast={isLast}
            forParent={forParent}
          />
        );
      case 'board':
        return (
          <MoveDropZone
            isOver={isOver}
            activeNode={activeData.node}
            node={node}
            setNodeRef={setNodeRef}
            isLast={isLast}
            forParent={forParent}
          />
        );
    }
  },
  'DropFieldZone',
);

type DropZoneProps = {
  node: CollectionFields;
  isOver: boolean;
  setNodeRef: (node: HTMLElement | null) => void;
  isLast?: boolean;
  forParent?: boolean;
};

type AddDropZoneProps = {
  activeInfo: FieldInfo;
} & DropZoneProps;

export const AddDropZone = reatomComponent<AddDropZoneProps>(
  ({ ctx, node, forParent, isLast, setNodeRef, isOver, activeInfo }) => {
    useDndMonitor({
      onDragEnd() {
        if (isOver) {
          const newNode = collectionBuilder.createField(activeInfo.type);

          if (forParent) {
            node.actions.addChild(ctx, newNode);
          } else if (isLast) {
            node.actions.after(ctx, newNode);
          } else {
            node.actions.before(ctx, newNode);
          }
        }
      },
    });

    return (
      <Flex
        ref={setNodeRef}
        minHeight={isOver ? '20px' : '0px'}
        borderColor={'green.500'}
        borderRadius={4}
        borderStyle={'dashed'}
        borderWidth={'2px'}
        flex={1}
      />
    );
  },
  'AddDropZone',
);

type MoveDropZoneProps = {
  activeNode: CollectionFields;
} & DropZoneProps;

export const MoveDropZone = reatomComponent<MoveDropZoneProps>(
  ({ node, activeNode, setNodeRef, ctx, isOver, isLast, forParent }) => {
    const isSame = node.id === activeNode.id;

    const isPrev = ctx.spy(node.nodes.$prev)?.id === activeNode.id;

    const isNext = ctx.spy(node.nodes.$next)?.id === activeNode.id;

    const isChild = useMemo(
      () => activeNode.actions.isChild(ctx, node),
      [activeNode.actions, ctx, node],
    );

    useDndMonitor({
      onDragEnd() {
        if (isOver) {
          activeNode.actions.detach(ctx);

          if (forParent) {
            console.log({
              nodeId: node.id,
              activeNodeId: activeNode.id,
            });
            node.actions.addChild(ctx, activeNode);
          } else if (isLast) {
            node.actions.after(ctx, activeNode);
          } else {
            node.actions.before(ctx, activeNode);
          }
        }
      },
    });

    const calculateIsDisabled = () => {
      if (forParent) {
        if (isChild) {
          return true;
        }

        return false;
      }

      if (isLast) {
        if (isChild || isNext || isSame) {
          return true;
        }
      } else {
        if (isChild || isPrev || isSame) {
          return true;
        }
      }

      return false;
    };

    const isDisabled = calculateIsDisabled();

    if (isDisabled) {
      return null;
    }

    return (
      <Flex
        ref={setNodeRef}
        minHeight={isOver ? '20px' : '0px'}
        borderColor={'blue.500'}
        borderRadius={4}
        borderStyle={'dashed'}
        borderWidth={'2px'}
        flex={1}
      />
    );
  },
  'MoveDropZone',
);
