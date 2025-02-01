import { Flex } from '@chakra-ui/react';
import { closestCorners, DndContext } from '@dnd-kit/core';
import { reatomComponent } from '@reatom/npm-react';
import { useRef } from 'react';

import { useIntersection } from '@/widgets/collection-builder/hooks/use-intersection.ts';
import { Builder } from '@/widgets/collection-builder/ui/board/builder.tsx';

import { FieldsMenu } from './ui/menu/fields-menu.tsx';

export const CollectionBuilder = reatomComponent(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const { intersection } = useIntersection({
    firstRef: containerRef,
    secondRef: menuRef,
  });

  return (
    <DndContext collisionDetection={closestCorners}>
      <Flex
        ref={containerRef}
        style={{
          paddingRight: `${intersection}px`,
        }}
        flex={1}
        overflow={'hidden'}
        maxWidth={'8xl'}
        marginInline={'auto'}
        width={'100%'}
      >
        <Builder />

        <FieldsMenu containerRef={menuRef} />
      </Flex>
    </DndContext>
  );
}, 'CollectionBuilder');
