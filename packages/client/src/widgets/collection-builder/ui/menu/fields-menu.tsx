import { Box, Flex, FlexProps, Icon, Separator, Text } from '@chakra-ui/react';
import { Portal } from '@chakra-ui/react';
import { css } from '@emotion/css';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { clsx } from 'clsx';
import { Resizable } from 're-resizable';
import { RefObject, useImperativeHandle, useRef, useState } from 'react';

import { useDraggableMenuItem } from '@/widgets/collection-builder/ui/dnd/hooks.ts';

import { FieldInfo, groupedFields, GroupInfo } from '../../fields-info.tsx';

export type FieldsMenuProps = {
  containerRef?: RefObject<HTMLElement | null>;
};

export const FieldsMenu = reatomComponent<FieldsMenuProps>(
  ({ containerRef }) => {
    const resizableRef = useRef<Resizable>(null);

    const [isResizing, setIsResizing] = useState(false);

    useImperativeHandle(
      containerRef,
      () => resizableRef.current?.resizable ?? null,
    );

    return (
      <>
        <Resizable
          ref={resizableRef}
          className={containerStyles}
          defaultSize={{ width: 400 }}
          maxWidth={600}
          minWidth={300}
          enable={{ left: true }}
          handleClasses={{
            left: clsx(
              isResizing && 'resizable-handle-left--active',
              'resizable-handle-left',
            ),
          }}
          onResizeStart={() => setIsResizing(true)}
          onResizeStop={() => setIsResizing(false)}
        >
          <Text as={'h3'} paddingInline={3} fontWeight={'semibold'}>
            <Trans>Collection fields</Trans>
          </Text>

          {groupedFields.map(({ group, fields }) => {
            return (
              <MenuGroupItem key={group.id} group={group} fields={fields} />
            );
          })}
        </Resizable>
        <Portal />
      </>
    );
  },
  'FieldsMenu',
);

const containerStyles = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  padding-block: var(--chakra-spacing-3);
  padding-inline: var(--chakra-spacing-1);
  gap: var(--chakra-spacing-3);

  background-color: var(--chakra-colors-white);
  box-shadow: var(--chakra-shadows-sm);

  position: absolute !important;
  top: 0;
  right: 0;
  bottom: 0;

  .resizable-handle-left {
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 1px;
      height: 100%;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      &::after {
        background-color: var(--chakra-colors-black);
      }
    }

    &--active {
      position: relative;

      &::after {
        background-color: var(--chakra-colors-black);
      }
    }
  }
`;

type GroupItemProps = {
  group: GroupInfo;
  fields: FieldInfo[];
};

const MenuGroupItem = reatomComponent<GroupItemProps>(({ group, fields }) => {
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
        {fields.map((field) => (
          <DraggableMenuFieldItem field={field} key={field.type} />
        ))}
      </Flex>
    </Box>
  );
}, 'MenuGroupItem');

type DraggableFieldItemProps = {} & FieldItemProps;

export const DraggableMenuFieldItem = reatomComponent<DraggableFieldItemProps>(
  ({ field }) => {
    const { attributes, listeners, setNodeRef, isDragging } =
      useDraggableMenuItem({
        info: field,
      });

    return (
      <Box {...attributes} {...listeners} ref={setNodeRef}>
        <MenuFieldItem field={field} isDragging={isDragging} />
      </Box>
    );
  },
  'DraggableMenuFieldItem',
);

type FieldItemProps = {
  field: FieldInfo;
  containerProps?: FlexProps;
  isDragging?: boolean;
};

export const MenuFieldItem = reatomComponent<FieldItemProps>(
  ({ field, containerProps, isDragging }) => {
    return (
      <Flex
        {...containerProps}
        paddingBlock={2}
        paddingInline={2}
        borderStyle={'dashed'}
        borderWidth={2}
        borderRadius={4}
        borderColor={'gray.300'}
        backgroundColor={'white'}
        alignItems={'flex-start'}
        flexDirection={'column'}
        gap={1}
        _hover={{
          borderColor: 'gray.500',
          cursor: 'pointer',
        }}
        opacity={isDragging ? 0.5 : 1}
      >
        <Flex alignItems={'center'} gap={1}>
          <Icon>
            <i>{field.icon}</i>
          </Icon>
          <Text>{field.title}</Text>
        </Flex>

        <Flex alignItems={'center'} gap={1}>
          <Icon opacity={0}>
            <i>{field.icon}</i>
          </Icon>

          <Text fontSize={'sm'} color={'gray.500'}>
            {field.description}
          </Text>
        </Flex>
      </Flex>
    );
  },
  'MenuFieldItem',
);
