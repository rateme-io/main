import { Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { motion } from 'motion/react';
import { PropsWithChildren, useEffect, useMemo, useState } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';

import { FIELD_NAME_ISSUE } from '@/shared/field-builder/field';
import { BoardNode } from '@/shared/field-builder/manager';
import { Draggable, useDraggableContext } from '@/shared/ui/dnd.tsx';
import { Editable } from '@/shared/ui/editable.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useDraggableField, useDroppableZone } from '../hooks/dnd.ts';
import { FieldContext } from './field.context.ts';
import { IssueRenderer } from './issue-renderer.tsx';

type DraggableFieldRendererProps = {
  node: BoardNode;
};

export const DraggableFieldRenderer = reatomMemo<DraggableFieldRendererProps>(
  ({ node }) => {
    const dragValue = useDraggableField({
      type: 'board',
      node,
    });

    return (
      <Draggable value={dragValue}>
        <Flex
          ref={dragValue.setNodeRef}
          {...dragValue.attributes}
          flex={1}
          position={'relative'}
        >
          <FieldRenderer node={node} />
        </Flex>
      </Draggable>
    );
  },
  'DraggableFieldRenderer',
);

type CancelDropZoneProps = {
  node: BoardNode;
};

const CancelDropZone = reatomMemo<CancelDropZoneProps>(({ node }) => {
  const { active, setNodeRef } = useDroppableZone({
    type: 'cancel',
    node,
  });

  const isActive =
    active?.data?.current?.type === 'board' &&
    active?.data?.current?.node?.id === node.id;

  return (
    <Flex
      asChild
      ref={setNodeRef}
      position={'absolute'}
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={3}
      pointerEvents={isActive ? 'auto' : 'none'}
      userSelect={'none'}
      width={'100%'}
      height={'100%'}
      alignItems={'center'}
      justifyContent={'center'}
      borderColor={'red.fg'}
      borderWidth={2}
      borderStyle={'dashed'}
      borderRadius={'md'}
      backgroundColor={'red.subtle'}
      color={'red.fg'}
    >
      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: isActive ? 1 : 0,
        }}
      >
        <Text>
          <Trans>Drop here if you want to cancel the operation</Trans>
        </Text>
      </motion.div>
    </Flex>
  );
}, 'CancelDropZone');

type FieldRendererProps = {
  node: BoardNode;
};

const FieldRenderer = reatomMemo<FieldRendererProps>(({ node }) => {
  const Content = node.field.ui.FieldContent;

  const context = useMemo(() => ({ node }), [node]);

  return (
    <FieldContext.Provider value={context}>
      <FieldRendererContainer node={node}>
        <CancelDropZone node={node} />

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
            <Content state={node.state} issueManager={node.issueManager} />
          </Flex>
          <FieldRendererDragActivator />
        </Flex>
      </FieldRendererContainer>
    </FieldContext.Provider>
  );
}, 'FieldRenderer');

type FieldRendererNameProps = {
  node: BoardNode;
};

const FieldRendererName = reatomMemo<FieldRendererNameProps>(
  ({ ctx, node }) => {
    return (
      <IssueRenderer
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
}>;

const ENTER_ANIMATION_DURATION = 100;

const FieldRendererContainer = reatomMemo<FieldRendererContainerProps>(
  ({ node, children, ctx }) => {
    const [isAnimated, setIsAnimated] = useState(false);

    useEffect(() => {
      const id = setTimeout(() => {
        setIsAnimated(true);
      }, ENTER_ANIMATION_DURATION);

      return () => clearTimeout(id);
    }, []);

    return (
      <Flex
        asChild
        flexDirection={'column'}
        borderColor={'border'}
        borderWidth={2}
        borderStyle={'solid'}
        borderRadius={'md'}
        backgroundColor={'bg'}
        outline={'black'}
        overflow={isAnimated ? 'initial' : 'hidden'}
        flex={1}
        onBlur={() => node.issueManager.revalidate(ctx)}
      >
        <motion.div
          layoutId={node.id}
          initial={{
            height: 0,
          }}
          animate={{
            height: 'auto',
            transition: {
              type: 'spring',
              stiffness: 500,
              damping: 30,
              duration: ENTER_ANIMATION_DURATION / 1000,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              duration: 0.1,
            },
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
