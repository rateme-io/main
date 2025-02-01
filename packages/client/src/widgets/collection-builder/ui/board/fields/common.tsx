import { Flex, Icon } from '@chakra-ui/react';
import { DraggableAttributes } from '@dnd-kit/core';
import { SyntheticListenerMap } from '@dnd-kit/core/dist/hooks/utilities';
import { reatomComponent } from '@reatom/npm-react';
import { PropsWithChildren } from 'react';
import { MdDragIndicator } from 'react-icons/md';

import { Button } from '@/shared/ui/button.tsx';
import { fieldsInfo } from '@/widgets/collection-builder/fields-info.tsx';
import {
  CollectionField,
  CollectionFields,
  CollectionTypes,
} from '@/widgets/collection-builder/model';

import { useFieldContext } from '../context.ts';

type FieldContainerProps = PropsWithChildren<{
  node: CollectionFields;
}>;

export const FieldContainer = reatomComponent<FieldContainerProps>(
  ({ node, children }) => {
    const { icon, title } = fieldsInfo[node.type];

    const {
      listeners,
      setNodeRef,
      setActivatorNodeRef,
      attributes,
      isOverlay,
    } = useFieldContext();

    return (
      <Flex
        {...attributes}
        ref={setNodeRef}
        borderRadius={4}
        overflow={'hidden'}
        flexDirection={'column'}
        borderColor={'gray.500'}
        borderWidth={1}
        borderStyle={'solid'}
        backgroundColor={'white'}
        opacity={isOverlay ? 0.5 : 1}
      >
        <Flex as={'header'} paddingInline={1}>
          <Flex paddingBlock={1}>
            <Flex alignItems={'center'} fontSize={12} gap={1}>
              {icon} {title}
            </Flex>
          </Flex>
        </Flex>
        <Flex as={'main'} flex={1}>
          <Flex
            paddingBlock={1}
            paddingInline={1}
            flexDirection={'column'}
            flex={1}
          >
            {children}
          </Flex>
          <Flex
            alignItems={'center'}
            justifyContent={'center'}
            paddingInline={1}
          >
            <Button
              unstyled
              cursor={'pointer'}
              ref={setActivatorNodeRef}
              {...listeners}
            >
              <Icon
                color={'gray.500'}
                _hover={{
                  color: 'gray.700',
                }}
              >
                <i>
                  <MdDragIndicator />
                </i>
              </Icon>
            </Button>
          </Flex>
        </Flex>
      </Flex>
    );
  },
  'FieldContainer',
);

export type FieldProps<Type extends CollectionTypes> = {
  node: CollectionField<Type>;
  setNodeRef?: (node: HTMLElement | null) => void;
  setActivatorNodeRef?: (node: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
  attributes?: DraggableAttributes;
};
