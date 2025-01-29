import { Flex } from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';
import { useRef } from 'react';

import { Editable } from '@/shared/ui/editable.tsx';
import { ImageLoader } from '@/shared/ui/image-loader.tsx';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { PageWrapper } from '@/shared/ui/page-wrapper.tsx';
import { useIntersection } from '@/widgets/collection-builder/hooks/use-intersection.ts';

import {
  collectionImageField,
  collectionNameField,
  MAX_FILE_SIZE,
} from './model';
import { FieldsMenu } from './ui/fields-menu.tsx';

export const CollectionBuilder = reatomComponent(() => {
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLElement>(null);

  const { intersection } = useIntersection({
    firstRef: containerRef,
    secondRef: menuRef,
  });

  return (
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
      <Flex flex={1} overflowY={'auto'}>
        <PageLayout flex={1} height={'fit-content'}>
          <PageWrapper flex={1} height={'fit-content'}>
            <Flex flexDirection={'column'} gap={1}>
              <CollectionNameField />

              <CollectionImageField />
            </Flex>

            <Flex></Flex>
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
