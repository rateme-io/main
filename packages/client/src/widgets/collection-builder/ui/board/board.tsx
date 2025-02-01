import { Flex } from '@chakra-ui/react';
import { AtomMut } from '@reatom/framework';
import { reatomComponent } from '@reatom/npm-react';

import {
  collectionBuilder,
  CollectionFields,
} from '@/widgets/collection-builder/model';

import { BoardOverlay } from '../dnd/board-overlay.tsx';
import { DraggableFieldRenderer } from '../field-renderer.tsx';

export const Board = reatomComponent(() => {
  return (
    <Flex flexDirection={'column'} flex={1} gap={2}>
      <BoardItem
        $node={collectionBuilder.$child}
        parent={collectionBuilder.root}
      />

      <BoardOverlay />
    </Flex>
  );
}, 'Board');

type BoardItemProps = {
  $node: AtomMut<CollectionFields | null>;
  parent?: CollectionFields;
};

export const BoardItem = reatomComponent<BoardItemProps>(
  ({ ctx, $node, parent }) => {
    const node = ctx.spy($node);

    if (node === null) {
      if (!parent) {
        return null;
      }

      const child = ctx.spy(parent.nodes.$child);

      if (child) {
        return null;
      }

      return (
        <DraggableFieldRenderer
          key={`${parent.id}-empty`}
          node={parent}
          forParent
        />
      );
    }

    return (
      <>
        <DraggableFieldRenderer key={node.id} node={node} />

        <BoardItem $node={node.nodes.$next} parent={parent} />
      </>
    );
  },
  'BoardItem',
);
