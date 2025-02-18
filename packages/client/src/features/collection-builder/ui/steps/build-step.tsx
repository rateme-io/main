import { Grid, GridItem, Tabs } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { select } from '@reatom/framework';
import { useAtom } from '@reatom/npm-react';
import { CreatableSelect } from 'chakra-react-select';
import { MdPreview } from 'react-icons/md';
import { SiFormspree } from 'react-icons/si';

import { useCollectionBuilderContext } from '@/features/collection-builder/context.ts';
import { MAX_FILE_SIZE } from '@/shared/constants/file.ts';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Button } from '@/shared/ui/button.tsx';
import { Editable } from '@/shared/ui/editable.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { ImageLoader } from '@/shared/ui/image-loader.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

export const BuildStep = reatomMemo(({ ctx }) => {
  const { model } = useCollectionBuilderContext();

  const hasChild = select(
    ctx,
    (ctx) => ctx.spy(model.fields.tree.$child) !== null,
  );

  return (
    <Tabs.Root asChild defaultValue={'builder'} variant={'subtle'} lazyMount>
      <Grid
        flex={'content'}
        gap={4}
        display={'grid'}
        templateColumns={'min-content 1fr'}
        templateRows={'min-content min-content 1fr'}
        templateAreas={`
          "name tabs"
          "inputs board"
          "inputs board"
      `}
      >
        <GridItem gridArea={'name'} position={'relative'}>
          <CollectionNameField />
        </GridItem>

        <GridItem gridArea={'inputs'} flexDirection={'column'} gap={4}>
          <CollectionImageField />

          <CollectionTags />
        </GridItem>

        <GridItem
          gridArea={'tabs'}
          display={'flex'}
          justifyContent={'space-between'}
        >
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
              const isValid = model.fields.actions.validate(ctx);

              if (isValid) {
                model.$step.next(ctx);
              }
            }}
          >
            <Trans>Next</Trans>
          </Button>
        </GridItem>

        <GridItem gridArea={'board'}>
          <Tabs.Content value={'builder'} padding={0}>
            <FieldBuilder.ui.Board />
          </Tabs.Content>
          <Tabs.Content value={'preview'} padding={0}>
            <FieldBuilder.ui.Preview />
          </Tabs.Content>
        </GridItem>
      </Grid>
    </Tabs.Root>
  );
}, 'BuildStep');

const CollectionNameField = reatomMemo(({ ctx }) => {
  const { model } = useCollectionBuilderContext();

  return (
    <Editable
      onValueChange={(value) => model.nameField.$value(ctx, value)}
      value={ctx.spy(model.nameField.$value)}
      placeholder={<Trans>Collection name</Trans>}
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
  const { model } = useCollectionBuilderContext();

  const file = ctx.spy(model.imageField.$value);

  return (
    <ImageLoader
      containerProps={{
        width: '200px',
        height: '200px',
      }}
      label={<Trans>Collection image</Trans>}
      files={file ? [file] : []}
      onChangeFiles={(files) =>
        model.imageField.$value(ctx, files.at(0) ?? null)
      }
      maxFiles={1}
      accept={'image/*'}
      maxFileSize={MAX_FILE_SIZE}
    />
  );
}, 'CollectionImageField');

const CollectionTags = reatomMemo(({ ctx }) => {
  const { model } = useCollectionBuilderContext();

  const [value] = useAtom((ctx) =>
    ctx.spy(model.tagsField.$value).map((tag) => ({ value: tag, label: tag })),
  );

  return (
    <Field label={<Trans>Tags</Trans>}>
      <CreatableSelect
        isMulti
        value={value}
        onChange={(newValue) => {
          model.tagsField.$value(
            ctx,
            newValue.map((item) => item.value),
          );
        }}
      />
    </Field>
  );
}, 'CollectionTags');
