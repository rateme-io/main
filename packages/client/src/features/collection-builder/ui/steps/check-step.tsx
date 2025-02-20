import { Box } from '@chakra-ui/react/box';
import { Flex } from '@chakra-ui/react/flex';
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

      <Flex gap={4}>
        <Box flex={1}>
          <CollectionItemBuilder.ui
            fields={model.fields}
            model={collectionItemModel}
          />
        </Box>
        <Box flex={1}>
          <CollectionItem
            fields={model.fields}
            title={ctx.spy(collectionItemModel.nameField.$value)}
            image={ctx.spy(collectionItemModel.imageField.$value)}
          />
        </Box>
      </Flex>
    </Flex>
  );
}, 'CheckStep');
