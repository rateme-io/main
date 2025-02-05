import { Flex, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { Atom } from '@reatom/framework';
import { reatomComponent } from '@reatom/npm-react';

import { BoardNode } from '@/shared/field-builder/manager';

import { useFieldsManagerContext } from './context.ts';

export type FieldsManagerPreviewProps = {
  $isActive?: Atom<boolean>;
};

export const Preview = reatomComponent<FieldsManagerPreviewProps>(({ ctx }) => {
  const { model } = useFieldsManagerContext();

  const children = ctx.get(model.tree.$children);

  if (children.length === 0) {
    return (
      <Flex justifyContent={'center'} alignItems={'center'} padding={8}>
        <Text>
          <Trans>No fields</Trans>
        </Text>
      </Flex>
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

const FieldPreviewRenderer = reatomComponent<FieldPreviewRendererProps>(
  ({ node }) => {
    const Component = node.field.ui.FieldPreview;

    return <Component state={node.state} />;
  },
  'FieldPreviewRenderer',
);
