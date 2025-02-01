import { Flex } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { reatomComponent } from '@reatom/npm-react';

import { Editable } from '@/shared/ui/editable.tsx';
import { ImageLoader } from '@/shared/ui/image-loader.tsx';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { PageWrapper } from '@/shared/ui/page-wrapper.tsx';
import {
  collectionImageField,
  collectionNameField,
  MAX_FILE_SIZE,
} from '@/widgets/collection-builder/model';
import { Board } from '@/widgets/collection-builder/ui/board/board.tsx';

export const Builder = reatomComponent(() => {
  return (
    <Flex flex={1} overflowY={'auto'}>
      <PageLayout flex={1} height={'fit-content'}>
        <PageWrapper
          flex={1}
          height={'fit-content'}
          gap={4}
          display={'grid'}
          gridTemplateColumns={'min-content 1fr'}
          gridTemplateRows={'min-content 1fr'}
          gridTemplateAreas={`
            "name name"
            "image board"
          `}
        >
          <Box gridArea={'name'}>
            <CollectionNameField />
          </Box>

          <Box gridArea={'image'}>
            <CollectionImageField />
          </Box>

          <Box gridArea={'board'}>
            <Board />
          </Box>
        </PageWrapper>
      </PageLayout>
    </Flex>
  );
}, 'Builder');

const CollectionNameField = reatomComponent(({ ctx }) => {
  return (
    <Editable
      onValueChange={(value) => collectionNameField.$value(ctx, value)}
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
