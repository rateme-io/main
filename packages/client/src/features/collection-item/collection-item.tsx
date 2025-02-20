import { Box, Grid, GridItem, Heading, Image } from '@chakra-ui/react';

import { FieldBuilderModel } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

export type CollectionItemProps = {
  fields: FieldBuilderModel;
  title: string;
  image: File | null;
};

export const CollectionItem = reatomMemo<CollectionItemProps>(
  ({ ctx, image, fields, title }) => {
    const children = ctx.spy(fields.tree.$children);

    return (
      <Grid
        gap={4}
        templateAreas={
          image
            ? '"title title" "image fields"'
            : '"title title" "fields fields"'
        }
        templateColumns={'max-content 1fr'}
        templateRows={'min-content 1fr'}
      >
        <GridItem gridArea={'title'} minHeight={'30px'}>
          <Heading>{title}</Heading>
        </GridItem>

        <GridItem gridArea={'image'}>
          {image && (
            <Image
              src={URL.createObjectURL(image)}
              width={'200px'}
              height={'200px'}
              borderRadius={'l2'}
              borderColor={'border.emphasized'}
              borderWidth={2}
              borderStyle={'solid'}
            />
          )}
        </GridItem>

        <GridItem gridArea={'fields'}>
          <Box asChild>
            <table>
              {children.map((node) => (
                <node.field.preview.ui.Preview
                  key={node.id}
                  builderState={node.builder.state}
                  previewState={node.preview.state}
                />
              ))}
            </table>
          </Box>
        </GridItem>
      </Grid>
    );
  },
  'CollectionItem',
);
