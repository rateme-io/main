import { Flex } from '@chakra-ui/react';
import { useRef } from 'react';

import { FieldBuilder } from '@/shared/field-builder/manager';
import { FieldsManagerModel } from '@/shared/field-builder/manager/model';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useIntersection } from './hooks/use-intersection.ts';
import { Builder } from './ui/builder.tsx';
import { Menu } from './ui/menu.tsx';

type CollectionBuilderProps = {
  model: FieldsManagerModel;
};

export const CollectionBuilder = reatomMemo<CollectionBuilderProps>(
  ({ model }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const menuRef = useRef<HTMLElement>(null);

    const { intersection } = useIntersection({
      firstRef: containerRef,
      secondRef: menuRef,
    });

    return (
      <FieldBuilder.ui.Root value={model}>
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
    );
  },
  'CollectionBuilder',
);
