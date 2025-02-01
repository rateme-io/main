import { Flex } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { reatomComponent } from '@reatom/npm-react';

import { Editable } from '@/shared/ui/editable.tsx';

import { BoardItem } from '../board.tsx';
import { FieldContainer, FieldProps } from './common.tsx';

export const GroupField = reatomComponent<FieldProps<'group'>>(
  ({ ctx, node }) => {
    return (
      <FieldContainer node={node}>
        <Editable
          required
          onValueChange={(nextValue) => node.state.$name(ctx, nextValue)}
          value={ctx.spy(node.state.$name)}
          placeholder={t`Group name`}
        />

        <Flex flexDirection={'column'} gap={2} paddingBottom={2}>
          <BoardItem $node={node.nodes.$child} parent={node} />
        </Flex>
      </FieldContainer>
    );
  },
  'GroupField',
);
