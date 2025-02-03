import { Flex } from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';
import { useRef } from 'react';

import { CollectionFields } from './fields';
import { useIntersection } from './hooks/use-intersection.ts';
import { Builder } from './ui/builder.tsx';

export const CollectionBuilder = reatomComponent(() => {
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
        marginInline={'auto'}
        width={'100%'}
      >
        <Builder />

        <CollectionFields.Menu containerRef={menuRef} />
      </Flex>
    </CollectionFields.Root>
  );
}, 'CollectionBuilder');
