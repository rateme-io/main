import { Box } from '@chakra-ui/react/box';

import { FieldBuilderModel } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

export type CollectionItemBuilderProps = {
  model: FieldBuilderModel;
};

export const CollectionItemBuilder = reatomMemo<CollectionItemBuilderProps>(
  ({ ctx, model }) => {
    const children = ctx.spy(model.tree.$children);

    return (
      <Box>
        <Box>
          {children.map((item) => (
            <item.field.ui.FieldPreview key={item.id} state={item.state} />
          ))}
        </Box>
      </Box>
    );
  },
  'CollectionItemBuilder',
);
