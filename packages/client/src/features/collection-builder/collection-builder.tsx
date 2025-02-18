import { Flex } from '@chakra-ui/react';
import { useMemo, useRef } from 'react';

import { CollectionBuilderContext } from '@/features/collection-builder/context.ts';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useIntersection } from './hooks/use-intersection.ts';
import { CollectionBuilderModel } from './model';
import { Builder } from './ui/builder.tsx';
import { Menu } from './ui/menu.tsx';

type CollectionBuilderProps = {
  model: CollectionBuilderModel;
};

export const CollectionBuilder = reatomMemo<CollectionBuilderProps>(
  ({ model }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLElement>(null);

    const { intersection } = useIntersection({
      firstRef: containerRef,
      secondRef: menuRef,
    });

    const context = useMemo(() => ({ model }), [model]);

    return (
      <CollectionBuilderContext value={context}>
        <FieldBuilder.ui.Root value={model.fields}>
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
        </FieldBuilder.ui.Root>
      </CollectionBuilderContext>
    );
  },
  'CollectionBuilder',
);
