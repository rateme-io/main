import { Box, Flex, Icon, Separator, Text } from '@chakra-ui/react';
import { css } from '@emotion/css';
import { Trans } from '@lingui/react/macro';
import { clsx } from 'clsx';
import { Resizable } from 're-resizable';
import {
  PropsWithChildren,
  RefObject,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';

import { Field } from '@/shared/field-builder/field';
import { FieldGroup } from '@/shared/field-builder/group';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { useFieldsManagerContext } from './context.ts';
import { useDraggableField } from './hooks/dnd.ts';

export type FieldManagerMenuProps = {
  containerRef?: RefObject<HTMLElement | null>;
};

export const Menu = reatomMemo<FieldManagerMenuProps>(({ containerRef }) => {
  const { groups } = useFieldsManagerContext();

  return (
    <ResizableWrapper containerRef={containerRef}>
      <Text as={'h3'} paddingInline={3} fontWeight={'semibold'}>
        <Trans>Collection fields</Trans>
      </Text>

      {groups.map((group) => {
        return <MenuGroupItem key={group.id} group={group} />;
      })}
    </ResizableWrapper>
  );
}, 'Menu');

type ResizableWrapperProps = PropsWithChildren<{
  containerRef?: RefObject<HTMLElement | null>;
}>;

const ResizableWrapper = reatomMemo<ResizableWrapperProps>(
  ({ children, containerRef }) => {
    const resizableRef = useRef<Resizable>(null);

    const [isResizing, setIsResizing] = useState(false);

    useImperativeHandle(
      containerRef,
      () => resizableRef.current?.resizable ?? null,
    );

    return (
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
        {children}
      </Resizable>
    );
  },
  'ResizableWrapper',
);

const containerStyles = css`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: auto;
  padding-block: var(--chakra-spacing-3);
  padding-inline: var(--chakra-spacing-1);
  gap: var(--chakra-spacing-3);

  background-color: var(--chakra-colors-bg);
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
        background-color: var(--chakra-colors-bg-inverted);
      }
    }

    &--active {
      position: relative;

      &::after {
        background-color: var(--chakra-colors-bg-inverted);
      }
    }
  }
`;

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
  field: Field<unknown>;
}>;

const MenuDraggableContainer = reatomMemo<MenuDraggableContainerProps>(
  ({ field, children }) => {
    const { setNodeRef, listeners, attributes } = useDraggableField(
      {
        type: 'menu',
        field,
      },
      {
        disabled: field.ui.comingSoon,
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
  field: Field<unknown>;
};

const MenuFieldItem = reatomMemo<FieldItemProps>(({ field }) => {
  return (
    <Flex
      pointerEvents={field.ui.comingSoon ? 'none' : 'auto'}
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
            <i>{field.ui.icon}</i>
          </Icon>
          <Text>{field.ui.title}</Text>
        </Flex>

        {field.ui.comingSoon && (
          <Flex
            borderRadius={'md'}
            backgroundColor={'bg.info'}
            paddingInline={1}
            color={'fg.info'}
          >
            <Trans>coming soon</Trans>
          </Flex>
        )}
      </Flex>

      <Flex alignItems={'center'} gap={1}>
        <Icon opacity={0}>
          <i>{field.ui.icon}</i>
        </Icon>

        <Text fontSize={'sm'} color={'fg.muted'}>
          {field.ui.description}
        </Text>
      </Flex>
    </Flex>
  );
}, 'MenuFieldItem');
