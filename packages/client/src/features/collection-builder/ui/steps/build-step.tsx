import { Box, Flex, Tabs } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { select } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
import { CreatableSelect } from 'chakra-react-select';
import { MdPreview } from 'react-icons/md';
import { SiFormspree } from 'react-icons/si';

import {
  $step,
  collectionImageField,
  collectionNameField,
  collectionTagsField,
  MAX_FILE_SIZE,
} from '@/features/collection-builder/model';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Button } from '@/shared/ui/button.tsx';
import { Editable } from '@/shared/ui/editable.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { ImageLoader } from '@/shared/ui/image-loader.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

export const BuildStep = reatomMemo(({ ctx }) => {
  const { model } = FieldBuilder.ui.useContext();

  const hasChild = select(ctx, (ctx) => ctx.spy(model.tree.$child) !== null);

  return (
    <Tabs.Root
      flex={'content'}
      defaultValue={'builder'}
      variant={'subtle'}
      lazyMount
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
      <Box gridArea={'name'} position={'relative'}>
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
          disabled={!hasChild}
          onClick={() => {
            const isValid = model.actions.validate(ctx);

            if (isValid) {
              $step.next(ctx);
            }
          }}
        >
          <Trans>Next</Trans>
        </Button>
      </Flex>

      <Box gridArea={'board'}>
        <Tabs.Content value={'builder'} padding={0}>
          <FieldBuilder.ui.Board />
        </Tabs.Content>
        <Tabs.Content value={'preview'} padding={0}>
          <FieldBuilder.ui.Preview />
        </Tabs.Content>
      </Box>
    </Tabs.Root>
  );
}, 'BuildStep');

const CollectionNameField = reatomMemo(({ ctx }) => {
  return (
    <Editable
      onValueChange={(value) => collectionNameField.$value(ctx, value)}
      value={ctx.spy(collectionNameField.$value)}
      placeholder={'Collection name'}
      required
      containerProps={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
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
