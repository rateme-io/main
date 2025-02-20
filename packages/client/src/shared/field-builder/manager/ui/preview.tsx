import { EmptyState, Flex } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { FaRegFaceSadTear } from 'react-icons/fa6';

import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useFieldBuilderContext } from './context.ts';

export type FieldsManagerPreviewProps = object;

export const Preview = reatomMemo<FieldsManagerPreviewProps>(({ ctx }) => {
  const { model } = useFieldBuilderContext();

  const children = ctx.spy(model.tree.$children);

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
        <node.field.preview.ui.PreviewEditor
          key={node.id}
          builderState={node.builder.state}
          previewState={node.preview.state}
        />
      ))}
    </Flex>
  );
}, 'Preview');
