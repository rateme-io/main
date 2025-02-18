import { Grid, GridItem } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useAtom } from '@reatom/npm-react';
import { CreatableSelect } from 'chakra-react-select';
import { useMemo } from 'react';

import { MAX_FILE_SIZE } from '@/shared/constants/file.ts';
import { FieldBuilderModel } from '@/shared/field-builder/manager';
import { Editable } from '@/shared/ui/editable.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { ImageLoader } from '@/shared/ui/image-loader.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import {
  CollectionItemBuilderContext,
  useCollectionItemBuilder,
} from './context.ts';
import { CollectionItemBuilderModel } from './model.ts';

export type CollectionItemBuilderProps = {
  fields: FieldBuilderModel;
  model: CollectionItemBuilderModel;
};

export const CollectionItemBuilder = reatomMemo<CollectionItemBuilderProps>(
  ({ ctx, model, fields }) => {
    const children = ctx.spy(fields.tree.$children);

    const context = useMemo(() => ({ fields, model }), [fields, model]);

    return (
      <CollectionItemBuilderContext value={context}>
        <Grid
          templateColumns={'min-content 1fr'}
          templateRows={'min-content min-content 1fr'}
          templateAreas={`
          "name name"
          "inputs fields"
          "inputs fields"
        `}
          gap={4}
        >
          <GridItem gridArea={'name'} position={'relative'} height={'40px'}>
            <CollectionItemName />
          </GridItem>

          <GridItem
            gridArea={'inputs'}
            display={'flex'}
            flexDirection={'column'}
            gap={4}
          >
            <CollectionItemImage />

            <CollectionItemTags />
          </GridItem>

          <GridItem
            gridArea={'fields'}
            display={'flex'}
            gap={2}
            flexDirection={'column'}
          >
            {children.map((item) => (
              <item.field.ui.FieldPreview
                key={item.id}
                builderState={item.builder.state}
              />
            ))}
          </GridItem>
        </Grid>
      </CollectionItemBuilderContext>
    );
  },
  'CollectionItemBuilder',
);

const CollectionItemName = reatomMemo(({ ctx }) => {
  const { model } = useCollectionItemBuilder();

  return (
    <Editable
      containerProps={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
      }}
      placeholder={<Trans>Collection item name</Trans>}
      onValueChange={ctx.bind(model.nameField.$value)}
      value={ctx.spy(model.nameField.$value)}
      required
    />
  );
}, 'CollectionItemName');

const CollectionItemImage = reatomMemo(({ ctx }) => {
  const { model } = useCollectionItemBuilder();

  const file = ctx.spy(model.imageField.$value);

  return (
    <ImageLoader
      containerProps={{
        width: '200px',
        height: '200px',
      }}
      label={<Trans>Collection item image</Trans>}
      files={file ? [file] : []}
      onChangeFiles={(files) =>
        model.imageField.$value(ctx, files.at(0) ?? null)
      }
      maxFiles={1}
      accept={'image/*'}
      maxFileSize={MAX_FILE_SIZE}
    />
  );
}, 'CollectionItemImage');

const CollectionItemTags = reatomMemo(({ ctx }) => {
  const { model } = useCollectionItemBuilder();

  const [value] = useAtom((ctx) =>
    ctx.spy(model.tagsField.$value).map((tag) => ({ value: tag, label: tag })),
  );

  return (
    <Field label={<Trans>Tags</Trans>}>
      <CreatableSelect
        isMulti
        value={value}
        onChange={(newValue) =>
          model.tagsField.$value(
            ctx,
            newValue.map((item) => item.value),
          )
        }
      />
    </Field>
  );
}, 'CollectionItemTags');
