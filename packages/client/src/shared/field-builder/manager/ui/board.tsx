import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { Atom } from '@reatom/framework';
import { reatomComponent, useAtom } from '@reatom/npm-react';
import { motion } from 'motion/react';
import { PropsWithChildren } from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa6';
import { MdDragIndicator } from 'react-icons/md';

import { BoardNode } from '@/shared/field-builder/manager';
import {
  useDraggableField,
  useDroppableZone,
} from '@/shared/field-builder/manager/ui/hooks/dnd.ts';
import { useTemporaryValue } from '@/shared/hooks/use-temporary-value.ts';
import { Editable } from '@/shared/ui/editable.tsx';

import { useFieldsManagerContext } from './context.ts';

export type FieldsManagerBoardProps = object;

export const Board = reatomComponent<FieldsManagerBoardProps>(() => {
  const { tree } = useFieldsManagerContext();

  return (
    <Flex flexDirection={'column'} gap={1}>
      <BoardItem $node={tree.$child} index={0} />
    </Flex>
  );
}, 'Board');

type BoardItemProps = {
  $node: Atom<BoardNode | null>;
  index: number;
};

const BoardItem = reatomComponent<BoardItemProps>(({ ctx, $node, index }) => {
  const node = ctx.spy($node);

  if (!node) {
    if (index === 0) {
      return <AddFieldDropZone />;
    }

    return null;
  }

  return (
    <>
      <FieldDropWrapper key={node.id} isFirst={index === 0} node={node}>
        <FieldRenderer node={node} />
      </FieldDropWrapper>

      <BoardItem
        key={`${node.id}-next`}
        $node={node.nodes.$next}
        index={index + 1}
      />
    </>
  );
}, 'BoardItem');

type FieldDropWrapperProps = PropsWithChildren<{
  isFirst: boolean;
  node: BoardNode;
}>;

const FieldDropWrapper = reatomComponent<FieldDropWrapperProps>(
  ({ isFirst, node, children }) => {
    return (
      <>
        {isFirst && <InsertFieldDropZone node={node} type={'insert-before'} />}
        {children}
        <InsertFieldDropZone node={node} type={'insert-after'} />
      </>
    );
  },
  'FieldDropWrapper',
);

type InsertFieldDropZoneProps = {
  type: 'insert-after' | 'insert-before';
  node: BoardNode;
};

const InsertFieldDropZone = reatomComponent<InsertFieldDropZoneProps>(
  ({ node, type }) => {
    const { isOver, setNodeRef, active } = useDroppableZone({
      type,
      node,
    });

    const [isDisabled] = useAtom(
      (ctx) => {
        const data = active?.data.current;

        if (data?.type === 'board') {
          if (type === 'insert-after') {
            return (
              data.node.id === node.id ||
              data.node.id === ctx.spy(node.nodes.$next)?.id
            );
          } else if (type === 'insert-before') {
            return data.node.id === node.id;
          } else {
            throw new Error('Unknown type');
          }
        }

        return false;
      },
      [active],
    );

    const isActive = !!active;

    return (
      <Flex
        pointerEvents={isDisabled ? 'none' : 'auto'}
        ref={isDisabled ? undefined : setNodeRef}
        opacity={isActive && !isDisabled ? 1 : 0}
      >
        <Flex
          flex={1}
          height={'4px'}
          position={'relative'}
          backgroundColor={isOver ? 'blue.500' : 'gray.100'}
        >
          <Flex
            opacity={isOver ? 1 : 0}
            position={'absolute'}
            color={'white'}
            backgroundColor={'blue.500'}
            left={'50%'}
            top={'50%'}
            transform={'translate(-50%, -50%)'}
            borderRadius={'full'}
            padding={1}
            fontSize={'sm'}
          >
            <FaPlus />
          </Flex>
        </Flex>
      </Flex>
    );
  },
  'InsertFieldDropZone',
);

type FieldRendererProps = {
  node: BoardNode;
};

const FieldRenderer = reatomComponent<FieldRendererProps>(({ ctx, node }) => {
  const { $lastActiveNode } = useFieldsManagerContext();

  const { setNodeRef, listeners, attributes, setActivatorNodeRef, isDragging } =
    useDraggableField({
      type: 'board',
      node,
    });

  const { state, actions, field, $name } = node;

  const Content = field.ui.FieldContent;

  const lastActiveNode = ctx.spy($lastActiveNode);

  const isActive = useTemporaryValue({
    defaultValue: false,
    value: lastActiveNode?.id === node.id,
    timeout: 1000,
  });

  return (
    <Flex
      asChild
      ref={setNodeRef}
      {...attributes}
      flexDirection={'column'}
      borderColor={'gray.500'}
      borderWidth={1}
      borderStyle={'solid'}
      borderRadius={'md'}
      outline={'black'}
    >
      <motion.div
        transition={{
          scale: { duration: 0.1 },
          opacity: { duration: 0.1 },
          backgroundColor: { duration: 0.1 },
        }}
        initial={{
          scale: 1,
          opacity: 1,
          backgroundColor: 'white',
        }}
        animate={{
          scale: isDragging ? 0.99 : 1,
          opacity: isDragging ? 0.5 : 1,
          backgroundColor: isActive ? '#eff6ff' : '#ffffff',
        }}
      >
        <Flex justifyContent={'space-between'} padding={2}>
          <Flex gap={2} alignItems={'center'}>
            <Icon asChild>
              <i>{field.ui.icon}</i>
            </Icon>

            <Editable
              onValueChange={ctx.bind($name)}
              value={ctx.spy($name)}
              placeholder={field.ui.title}
            />
          </Flex>
          <Flex>
            <IconButton
              variant={'ghost'}
              size={'2xs'}
              onClick={() => {
                actions.detach(ctx);
              }}
            >
              <FaRegTrashAlt />
            </IconButton>
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
            <Content state={state} />
          </Flex>
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
        </Flex>
      </motion.div>
    </Flex>
  );
}, 'FieldRenderer');

const AddFieldDropZone = reatomComponent(() => {
  const { setNodeRef, isOver } = useDroppableZone({
    type: 'add',
  });

  return (
    <Flex
      ref={setNodeRef}
      borderWidth={2}
      borderStyle={'dashed'}
      borderColor={'currentcolor'}
      borderRadius={'md'}
      alignItems={'center'}
      justifyContent={'center'}
      padding={8}
      flexDirection={'column'}
      color={isOver ? 'blue.500' : 'gray.300'}
      backgroundColor={isOver ? 'blue.50' : 'white'}
    >
      <FaPlus />
    </Flex>
  );
}, 'AddFieldDropZone');
