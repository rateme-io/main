import { Flex } from '@chakra-ui/react';
import { useAtom } from '@reatom/npm-react';
import { AnimatePresence } from 'motion/react';
import { PropsWithChildren } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { BoardNode } from '@/shared/field-builder/manager';
import { useDroppableZone } from '@/shared/field-builder/manager/ui/hooks/dnd.ts';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { DraggableFieldRenderer } from './components/field-renderer.tsx';
import { useFieldsManagerContext } from './context.ts';

export type FieldsManagerBoardProps = object;

export const Board = reatomMemo<FieldsManagerBoardProps>(({ ctx }) => {
  const { model } = useFieldsManagerContext();

  const children = ctx.spy(model.tree.$children);

  if (children.length === 0) {
    return <AddFieldDropZone />;
  }

  return (
    <Flex
      flexDirection={'column'}
      gap={1}
      marginTop={'calc(var(--chakra-spacing-1) * -1 - 4px)'}
    >
      <AnimatePresence>
        {children.map((node, index) => (
          <FieldDropWrapper key={node.id} isFirst={index === 0} node={node}>
            <DraggableFieldRenderer node={node} />
          </FieldDropWrapper>
        ))}
      </AnimatePresence>
    </Flex>
  );
}, 'Board');

type FieldDropWrapperProps = PropsWithChildren<{
  isFirst: boolean;
  node: BoardNode;
}>;

const FieldDropWrapper = reatomMemo<FieldDropWrapperProps>(
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

const InsertFieldDropZone = reatomMemo<InsertFieldDropZoneProps>(
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

const AddFieldDropZone = reatomMemo(() => {
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
