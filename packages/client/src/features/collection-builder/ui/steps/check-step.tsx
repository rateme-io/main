import { Box } from '@chakra-ui/react/box';
import { Flex } from '@chakra-ui/react/flex';
import { Trans } from '@lingui/react/macro';

import { $step } from '@/features/collection-builder/model';
import { CollectionItem } from '@/features/collection-item';
import { CollectionItemBuilder } from '@/features/collection-item-builder';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Button } from '@/shared/ui/button.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

export const CheckStep = reatomMemo(({ ctx }) => {
  const { model } = FieldBuilder.ui.useContext();

  return (
    <Flex flexDirection={'column'} gap={2}>
      <Flex justifyContent={'flex-end'} gap={2}>
        <Button
          variant={'ghost'}
          onClick={() => {
            $step.prev(ctx);
          }}
        >
          <Trans>Prev</Trans>
        </Button>

        <Button
          variant={'ghost'}
          onClick={() => {
            $step.next(ctx);
          }}
        >
          <Trans>Next</Trans>
        </Button>
      </Flex>

      <Flex>
        <Box flex={1}>
          <CollectionItemBuilder model={model} />
        </Box>
        <Box flex={1}>
          <CollectionItem model={model} />
        </Box>
      </Flex>
    </Flex>
  );
}, 'CheckStep');
