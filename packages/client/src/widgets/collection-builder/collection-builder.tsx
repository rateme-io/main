import { Flex } from '@chakra-ui/react';
import { useEvent } from '@khmilevoi/use-event';
import { reatomComponent } from '@reatom/npm-react';
import { useLayoutEffect, useRef, useState } from 'react';

import { Editable } from '@/shared/ui/editable.tsx';
import { ImageLoader } from '@/shared/ui/image-loader.tsx';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { PageWrapper } from '@/shared/ui/page-wrapper.tsx';

import {
  collectionImageField,
  collectionNameField,
  MAX_FILE_SIZE,
} from './model';
import { FieldsMenu } from './ui/fields-menu.tsx';

export const CollectionBuilder = reatomComponent(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const [intersection, setIntersection] = useState<number>(0);

  const calculateIntersection = useEvent(() => {
    if (!containerRef.current || !menuRef.current) {
      return;
    }

    const containerWidth = containerRef.current.clientWidth;
    const containerBoundingRect = containerRef.current.getBoundingClientRect();

    const menuBoundingRect = menuRef.current.getBoundingClientRect();

    setIntersection(
      containerWidth + containerBoundingRect.x - menuBoundingRect.x,
    );
  });

  useLayoutEffect(() => {
    const menuElement = menuRef.current;

    calculateIntersection();

    window.addEventListener('resize', calculateIntersection);

    const resizeObserver = new ResizeObserver(calculateIntersection);

    if (menuElement) {
      resizeObserver.observe(menuElement);
    }

    return () => {
      window.removeEventListener('resize', calculateIntersection);

      resizeObserver.disconnect();
    };
  }, [calculateIntersection]);

  return (
    <Flex
      ref={containerRef}
      paddingRight={`${intersection}px`}
      flex={1}
      overflow={'hidden'}
      maxWidth={'8xl'}
      marginInline={'auto'}
      width={'100%'}
    >
      <Flex flex={1} overflowY={'auto'}>
        <PageLayout flex={1} height={'fit-content'}>
          <PageWrapper flex={1} height={'fit-content'}>
            <Flex flexDirection={'column'} gap={1}>
              <CollectionNameField />

              <CollectionImageField />
            </Flex>

            <Flex height={'10000px'}></Flex>
          </PageWrapper>
        </PageLayout>
      </Flex>

      <FieldsMenu containerRef={menuRef} />
    </Flex>
  );
}, 'CollectionBuilder');

const CollectionNameField = reatomComponent(({ ctx }) => {
  return (
    <Editable
      onChange={(value) => collectionNameField.$value(ctx, value)}
      value={ctx.spy(collectionNameField.$value)}
      placeholder={'Collection name'}
      required
    />
  );
}, 'CollectionNameField');

const CollectionImageField = reatomComponent(({ ctx }) => {
  const file = ctx.spy(collectionImageField.$value);

  return (
    <ImageLoader
      containerProps={{
        width: '200px',
        height: '200px',
      }}
      label={'Collection image'}
      files={file ? [file] : []}
      onChangeFiles={(files) =>
        collectionImageField.$value(ctx, files.at(0) ?? null)
      }
      maxFiles={1}
      accept={'image/*'}
      maxFileSize={MAX_FILE_SIZE}
    />
  );
}, 'CollectionImageField');
