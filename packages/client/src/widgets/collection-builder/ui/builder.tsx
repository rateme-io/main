import { Flex } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { Trans } from '@lingui/react/macro';
import { reatomComponent, useAtom } from '@reatom/npm-react';
import { CreatableSelect } from 'chakra-react-select';

import { Editable } from '@/shared/ui/editable.tsx';
import { Field } from '@/shared/ui/field';
import { ImageLoader } from '@/shared/ui/image-loader.tsx';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { PageWrapper } from '@/shared/ui/page-wrapper.tsx';
import { CollectionFields } from '@/widgets/collection-builder/fields';
import {
  collectionImageField,
  collectionNameField,
  collectionTagsField,
  MAX_FILE_SIZE,
} from '@/widgets/collection-builder/model';

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
          gridTemplateRows={'min-content min-content 1fr'}
          gridTemplateAreas={`
            "name view"
            "image board"
            "tags board"
          `}
        >
          <Box gridArea={'name'}>
            <CollectionNameField />
          </Box>

          <Box gridArea={'image'}>
            <CollectionImageField />
          </Box>

          <Box gridArea={'tags'}>
            <CollectionTags />
          </Box>

          <Box gridArea={'view'}></Box>

          <Box gridArea={'board'}>
            <CollectionFields.Board />
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

const CollectionTags = reatomComponent(({ ctx }) => {
  const [value] = useAtom((ctx) =>
    ctx
      .spy(collectionTagsField.$value)
      .map((tag) => ({ value: tag, label: tag })),
  );

  return (
    <Field label={<Trans>Tags</Trans>}>
      <CreatableSelect
        isMulti
        value={value}
        onChange={(newValue) => {
          collectionTagsField.$value(
            ctx,
            newValue.map((item) => item.value),
          );
        }}
      />
    </Field>
  );
}, 'CollectionTags');
