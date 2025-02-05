import { Flex, Icon, IconButton } from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';
import { motion } from 'motion/react';
import { FaRegTrashAlt } from 'react-icons/fa';
import { MdDragIndicator } from 'react-icons/md';

import { BoardNode } from '@/shared/field-builder/manager';
import { Draggable, useDraggableContext } from '@/shared/ui/dnd.tsx';
import { Editable } from '@/shared/ui/editable.tsx';

import { useDraggableField } from '../hooks/dnd.ts';

type DraggableFieldRendererProps = {
  node: BoardNode;
};

export const DraggableFieldRenderer =
  reatomComponent<DraggableFieldRendererProps>(({ node }) => {
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
  }, 'DraggableFieldRenderer');

type FieldRendererProps = {
  node: BoardNode;
  isDragging: boolean;
};

const FieldRenderer = reatomComponent<FieldRendererProps>(
  ({ ctx, node, isDragging }) => {
    const Content = node.field.ui.FieldContent;

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
          <Flex justifyContent={'space-between'} padding={2}>
            <Flex gap={2} alignItems={'center'}>
              <Icon asChild>
                <i>{node.field.ui.icon}</i>
              </Icon>

              <Editable
                onValueChange={ctx.bind(node.$name)}
                value={ctx.spy(node.$name)}
                placeholder={node.field.ui.title}
                required
              />
            </Flex>
            <Flex>
              <IconButton
                variant={'ghost'}
                size={'2xs'}
                onClick={() => {
                  node.actions.detach(ctx);
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
              <Content state={node.state} />
            </Flex>
            <FieldRendererDragActivator />
          </Flex>
        </motion.div>
      </Flex>
    );
  },
  'FieldRenderer',
);

const FieldRendererDragActivator = reatomComponent(() => {
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
