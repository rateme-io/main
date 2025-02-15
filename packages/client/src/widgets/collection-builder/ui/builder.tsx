import { Flex, Tabs } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { Trans } from '@lingui/react/macro';
import { useAtom } from '@reatom/npm-react';
import { CreatableSelect } from 'chakra-react-select';
import { MdPreview } from 'react-icons/md';
import { SiFormspree } from 'react-icons/si';

import { Button } from '@/shared/ui/button.tsx';
import { Editable } from '@/shared/ui/editable.tsx';
import { Field } from '@/shared/ui/field';
import { ImageLoader } from '@/shared/ui/image-loader.tsx';
import { PageLayout } from '@/shared/ui/page-layout.tsx';
import { PageWrapper } from '@/shared/ui/page-wrapper.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';
import { CollectionFields } from '@/widgets/collection-builder/fields';
import {
  $activeTab,
  BoardTabs,
  collectionImageField,
  collectionNameField,
  collectionTagsField,
  MAX_FILE_SIZE,
} from '@/widgets/collection-builder/model';

export const Builder = reatomMemo(({ ctx }) => {
  return (
    <Flex flex={1} overflowY={'auto'} top={0} left={0} right={0} bottom={0}>
      <PageLayout flex={1} height={'fit-content'}>
        <Tabs.Root
          display={'flex'}
          flex={'content'}
          defaultValue={'builder'}
          variant={'subtle'}
          lazyMount
          value={ctx.spy($activeTab)}
          onValueChange={(details) =>
            $activeTab(ctx, details.value as BoardTabs)
          }
        >
          <PageWrapper
            flex={1}
            height={'fit-content'}
            gap={4}
            display={'grid'}
            gridTemplateColumns={'min-content 1fr'}
            gridTemplateRows={'min-content min-content 1fr'}
            gridTemplateAreas={`
            "name tabs"
            "inputs board"
            "inputs board"
          `}
          >
            <Box gridArea={'name'}>
              <CollectionNameField />
            </Box>

            <Flex gridArea={'inputs'} flexDirection={'column'} gap={4}>
              <CollectionImageField />

              <CollectionTags />
            </Flex>

            <Flex gridArea={'tabs'} justifyContent={'space-between'}>
              <Tabs.List borderBottomWidth={0} _before={{ content: '""' }}>
                <Tabs.Trigger value={'builder'}>
                  <SiFormspree />

                  <Trans>Builder</Trans>
                </Tabs.Trigger>
                <Tabs.Trigger value={'preview'}>
                  <MdPreview />

                  <Trans>Preview</Trans>
                </Tabs.Trigger>
              </Tabs.List>

              <Button
                variant={'ghost'}
                onClick={() => CollectionFields.model.actions.submit(ctx)}
              >
                <Trans>Submit</Trans>
              </Button>
            </Flex>

            <Box gridArea={'board'}>
              <Tabs.Content value={'builder'} padding={0}>
                <CollectionFields.Board />
              </Tabs.Content>
              <Tabs.Content value={'preview'} padding={0}>
                <CollectionFields.Preview />
              </Tabs.Content>
            </Box>
          </PageWrapper>
        </Tabs.Root>
      </PageLayout>
    </Flex>
  );
}, 'Builder');

const CollectionNameField = reatomMemo(({ ctx }) => {
  return (
    <Editable
      onValueChange={(value) => collectionNameField.$value(ctx, value)}
      value={ctx.spy(collectionNameField.$value)}
      placeholder={'Collection name'}
      required
    />
  );
}, 'CollectionNameField');

const CollectionImageField = reatomMemo(({ ctx }) => {
  const file = ctx.spy(collectionImageField.$value);

  return (
    <ImageLoader
      containerProps={{
        width: '200px',
        height: '200px',
      }}
      label={<Trans>Collection image</Trans>}
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

const CollectionTags = reatomMemo(({ ctx }) => {
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
