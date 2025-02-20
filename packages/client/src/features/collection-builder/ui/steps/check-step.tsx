import { GridItem } from '@chakra-ui/react';
import { Alert } from '@chakra-ui/react/alert';
import { Flex } from '@chakra-ui/react/flex';
import { Grid } from '@chakra-ui/react/grid';
import { Trans } from '@lingui/react/macro';

import { useCollectionBuilderContext } from '@/features/collection-builder/context.ts';
import { CollectionItem } from '@/features/collection-item';
import { CollectionItemBuilder } from '@/features/collection-item-builder';
import { Button } from '@/shared/ui/button.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

const collectionItemModel = CollectionItemBuilder.createModel();

export const CheckStep = reatomMemo(({ ctx }) => {
  const { model } = useCollectionBuilderContext();

  return (
    <Flex flexDirection={'column'} gap={2}>
      <Flex justifyContent={'flex-end'} gap={2}>
        <Button
          variant={'ghost'}
          onClick={() => {
            model.$step.prev(ctx);
          }}
        >
          <Trans>Prev</Trans>
        </Button>

        <Button
          variant={'ghost'}
          onClick={() => {
            model.$step.next(ctx);
          }}
        >
          <Trans>Next</Trans>
        </Button>
      </Flex>

      <Grid
        gap={4}
        templateColumns={'1fr 1fr'}
        templateRows={'min-content 1fr'}
      >
        <GridItem>
          <Alert.Root height={'100%'}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>
                <Trans>
                  This is an example of the collection item builder that you
                  created in the previous step.
                </Trans>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </GridItem>

        <GridItem>
          <Alert.Root height={'100%'}>
            <Alert.Indicator />
            <Alert.Content>
              <Alert.Description>
                <Trans>This is an example of your collection item.</Trans>
              </Alert.Description>
            </Alert.Content>
          </Alert.Root>
        </GridItem>

        <GridItem>
          <CollectionItemBuilder.ui
            fields={model.fields}
            model={collectionItemModel}
          />
        </GridItem>

        <GridItem>
          <Flex flex={1} flexDirection={'column'}>
            <CollectionItem
              fields={model.fields}
              title={ctx.spy(collectionItemModel.nameField.$value)}
              image={ctx.spy(collectionItemModel.imageField.$value)}
            />
          </Flex>
        </GridItem>
      </Grid>
    </Flex>
  );
}, 'CheckStep');
