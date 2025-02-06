import { EmptyState, Flex } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { Atom } from '@reatom/framework';
import { FaRegFaceSadTear } from 'react-icons/fa6';

import { BoardNode } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useFieldsManagerContext } from './context.ts';

export type FieldsManagerPreviewProps = {
  $isActive?: Atom<boolean>;
};

export const Preview = reatomMemo<FieldsManagerPreviewProps>(({ ctx }) => {
  const { model } = useFieldsManagerContext();

  const children = ctx.get(model.tree.$children);

  if (children.length === 0) {
    return (
      <EmptyState.Root size={'lg'}>
        <EmptyState.Content>
          <EmptyState.Indicator>
            <FaRegFaceSadTear />
          </EmptyState.Indicator>
          <EmptyState.Title>
            <Trans>No fields</Trans>
          </EmptyState.Title>
          <EmptyState.Description textAlign={'center'}>
            <Trans>
              You can add fields to the board by dragging them from the right
              panel in the builder tab.
            </Trans>
          </EmptyState.Description>
        </EmptyState.Content>
      </EmptyState.Root>
    );
  }

  return (
    <Flex flexDirection={'column'} gap={2}>
      {children.map((node) => (
        <FieldPreviewRenderer key={node.id} node={node} />
      ))}
    </Flex>
  );
}, 'Preview');

type FieldPreviewRendererProps = {
  node: BoardNode;
};

const FieldPreviewRenderer = reatomMemo<FieldPreviewRendererProps>(
  ({ node }) => {
    const Component = node.field.ui.FieldPreview;

    return <Component state={node.state} />;
  },
  'FieldPreviewRenderer',
);
