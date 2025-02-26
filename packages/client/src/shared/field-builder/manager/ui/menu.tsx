import { Box, Flex, Icon, Separator, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { PropsWithChildren } from 'react';

import { Field } from '@/shared/field-builder/field';
import { FieldGroup } from '@/shared/field-builder/group';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useFieldBuilderContext } from './context.ts';
import { useDraggableField } from './hooks/dnd.ts';

export type FieldManagerMenuProps = object;

export const Menu = reatomMemo<FieldManagerMenuProps>(() => {
  const { model } = useFieldBuilderContext();

  return (
    <Flex
      width={'100%'}
      flexDirection={'column'}
      paddingBlock={3}
      paddingInline={1}
      gap={3}
      backgroundColor={'bg'}
    >
      <Text as={'h3'} paddingInline={3} fontWeight={'semibold'}>
        <Trans>Collection fields</Trans>
      </Text>

      {model.groups.map((group) => {
        return <MenuGroupItem key={group.id} group={group} />;
      })}
    </Flex>
  );
}, 'Menu');

type MenuGroupItemProps = {
  group: FieldGroup;
};

const MenuGroupItem = reatomMemo<MenuGroupItemProps>(({ group }) => {
  return (
    <Box>
      <Separator />

      <Flex paddingBlock={3} paddingInline={2} alignItems={'center'} gap={2}>
        <Icon>
          <i>{group.icon}</i>
        </Icon>
        <Text as={'h4'}>{group.title}</Text>
      </Flex>

      <Flex flexDirection={'column'} gap={2} paddingLeft={1}>
        {group.fields.map((field) => (
          <MenuDraggableContainer key={field.id} field={field}>
            <MenuFieldItem field={field} />
          </MenuDraggableContainer>
        ))}
      </Flex>
    </Box>
  );
}, 'MenuGroupItem');

type MenuDraggableContainerProps = PropsWithChildren<{
  field: Field<unknown, unknown>;
}>;

const MenuDraggableContainer = reatomMemo<MenuDraggableContainerProps>(
  ({ field, children }) => {
    const { setNodeRef, listeners, attributes } = useDraggableField(
      {
        type: 'menu',
        field,
      },
      {
        disabled: field.comingSoon,
      },
    );

    return (
      <div ref={setNodeRef} {...listeners} {...attributes}>
        {children}
      </div>
    );
  },
  'MenuDraggableContainer',
);

type FieldItemProps = {
  field: Field<unknown, unknown>;
};

const MenuFieldItem = reatomMemo<FieldItemProps>(({ field }) => {
  return (
    <Flex
      pointerEvents={field.comingSoon ? 'none' : 'auto'}
      paddingBlock={2}
      paddingInline={2}
      borderStyle={'dashed'}
      borderWidth={2}
      borderRadius={4}
      borderColor={'border.emphasized'}
      backgroundColor={'bg'}
      alignItems={'flex-start'}
      flexDirection={'column'}
      gap={1}
      _hover={{
        borderColor: 'gray.emphasized',
        cursor: 'pointer',
      }}
    >
      <Flex justifyContent={'space-between'} width={'100%'}>
        <Flex alignItems={'center'} gap={1}>
          <Icon>
            <i>{field.builder.ui.icon}</i>
          </Icon>
          <Text>{field.builder.ui.title}</Text>
        </Flex>

        {field.comingSoon && (
          <Flex
            borderRadius={'md'}
            backgroundColor={'bg.info'}
            paddingInline={1}
            color={'fg.info'}
            height={'min-content'}
          >
            <Trans>Coming soon</Trans>
          </Flex>
        )}
      </Flex>

      <Flex alignItems={'center'} gap={1}>
        <Icon opacity={0}>
          <i>{field.builder.ui.icon}</i>
        </Icon>

        <Text fontSize={'sm'} color={'fg.muted'}>
          {field.builder.ui.description}
        </Text>
      </Flex>
    </Flex>
  );
}, 'MenuFieldItem');
