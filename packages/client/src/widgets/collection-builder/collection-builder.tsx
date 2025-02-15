import { Flex } from '@chakra-ui/react';
import { useRef } from 'react';

import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { CollectionFields } from './fields';
import { useIntersection } from './hooks/use-intersection.ts';
import { Builder } from './ui/builder.tsx';
import { Menu } from './ui/menu.tsx';

export const CollectionBuilder = reatomMemo(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const { intersection } = useIntersection({
    firstRef: containerRef,
    secondRef: menuRef,
  });

  return (
    <CollectionFields.Root>
      <Flex
        ref={containerRef}
        style={{
          paddingRight: `${intersection}px`,
        }}
        flex={1}
        overflow={'hidden'}
        maxWidth={'8xl'}
        minWidth={'breakpoint-md'}
        marginInline={'auto'}
        width={'100%'}
      >
        <Builder />

        <Menu containerRef={menuRef} />
      </Flex>
    </CollectionFields.Root>
  );
}, 'CollectionBuilder');
