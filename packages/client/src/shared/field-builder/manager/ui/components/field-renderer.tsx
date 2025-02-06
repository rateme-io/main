import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { motion } from 'motion/react';
import { PropsWithChildren, useEffect } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';

import { FIELD_NAME_ISSUE } from '@/shared/field-builder/field';
import { BoardNode } from '@/shared/field-builder/manager';
import { Draggable, useDraggableContext } from '@/shared/ui/dnd.tsx';
import { Editable } from '@/shared/ui/editable.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useDraggableField } from '../hooks/dnd.ts';
import { IssueRenderer } from './issue-renderer.tsx';

type DraggableFieldRendererProps = {
  node: BoardNode;
};

export const DraggableFieldRenderer = reatomMemo<DraggableFieldRendererProps>(
  ({ node }) => {
    const value = useDraggableField({
      type: 'board',
      node,
    });

    const { setNodeRef, attributes, isDragging } = value;

    return (
      <Draggable value={value}>
        <Flex ref={setNodeRef} {...attributes} flex={1}>
          <FieldRenderer node={node} isDragging={isDragging} />
        </Flex>
      </Draggable>
    );
  },
  'DraggableFieldRenderer',
);

type FieldRendererProps = {
  node: BoardNode;
  isDragging: boolean;
};

const FieldRenderer = reatomMemo<FieldRendererProps>(({ node, isDragging }) => {
  const Content = node.field.ui.FieldContent;

  useEffect(() => {
    console.log('node');
  }, [node]);

  useEffect(() => {
    console.log('isDragging');
  }, [isDragging]);

  return (
    <FieldRendererContainer node={node} isDragging={isDragging}>
      <Flex justifyContent={'space-between'} padding={2}>
        <Flex gap={2} alignItems={'center'}>
          <Icon asChild>
            <i>{node.field.ui.icon}</i>
          </Icon>

          <FieldRendererName node={node} />
        </Flex>
        <Flex>
          <FieldRendererRemove node={node} />
        </Flex>
      </Flex>
      <Flex>
        <Flex
          paddingInline={2}
          paddingBlock={1}
          paddingBottom={2}
          flex={1}
          flexDirection={'column'}
          gap={2}
        >
          <Content state={node.state} />
        </Flex>
        <FieldRendererDragActivator />
      </Flex>
    </FieldRendererContainer>
  );
}, 'FieldRenderer');

type FieldRendererNameProps = {
  node: BoardNode;
};

const FieldRendererName = reatomMemo<FieldRendererNameProps>(
  ({ ctx, node }) => {
    return (
      <IssueRenderer
        manager={node.issueManager}
        issueId={FIELD_NAME_ISSUE}
        message={<Trans>Name is required</Trans>}
      >
        <Editable
          onValueChange={ctx.bind(node.$name)}
          value={ctx.spy(node.$name)}
          placeholder={node.field.ui.title}
          required
        />
      </IssueRenderer>
    );
  },
  'FieldRendererName',
);

type FieldRendererRemoveProps = {
  node: BoardNode;
};

const FieldRendererRemove = reatomMemo<FieldRendererRemoveProps>(
  ({ ctx, node }) => {
    return (
      <IconButton
        variant={'ghost'}
        size={'2xs'}
        onClick={() => {
          node.actions.detach(ctx);
        }}
      >
        <FaRegTrashAlt />
      </IconButton>
    );
  },
  'FieldRendererRemove',
);

type FieldRendererContainerProps = PropsWithChildren<{
  node: BoardNode;
  isDragging: boolean;
}>;

const FieldRendererContainer = reatomMemo<FieldRendererContainerProps>(
  ({ node, isDragging, children }) => {
    return (
      <Flex
        asChild
        flexDirection={'column'}
        borderColor={'gray.500'}
        borderWidth={1}
        borderStyle={'solid'}
        borderRadius={'md'}
        backgroundColor={'white'}
        outline={'black'}
        overflow={'hidden'}
        flex={1}
      >
        <motion.div
          layoutId={node.id}
          transition={{
            scale: { duration: 0.1 },
            opacity: { duration: 0.1 },
          }}
          initial={{
            scale: 1,
            opacity: 1,
            height: 0,
          }}
          animate={{
            scale: isDragging ? 0.99 : 1,
            opacity: isDragging ? 0.5 : 1,
            height: 'auto',
          }}
          exit={{
            opacity: 0,
          }}
        >
          {children}
        </motion.div>
      </Flex>
    );
  },
  'FieldRendererContainer',
);

const FieldRendererDragActivator = reatomMemo(() => {
  const value = useDraggableContext();

  if (value === null) {
    return null;
  }

  const { setActivatorNodeRef, listeners } = value;

  return (
    <Flex paddingInline={3} paddingBlock={2} alignItems={'center'}>
      <IconButton
        ref={setActivatorNodeRef}
        {...listeners}
        size={'2xs'}
        variant={'ghost'}
      >
        <MdDragIndicator />
      </IconButton>
    </Flex>
  );
}, 'FieldRendererDragActivator');
