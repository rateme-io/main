import { Box, Flex, IconButton, Input } from '@chakra-ui/react';
import { DndContext } from '@dnd-kit/core';
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { useAtom } from '@reatom/npm-react';
import { CreatableSelect, Select } from 'chakra-react-select';
import { PropsWithChildren, useMemo } from 'react';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { FaRegTrashAlt } from 'react-icons/fa';
import { FaCheck } from 'react-icons/fa6';
import { MdDragIndicator } from 'react-icons/md';

import { createFieldUI, FieldIssueManager } from '@/shared/field-builder/field';
import { IssueRenderer } from '@/shared/field-builder/manager';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import { Draggable, useDraggableContext } from '@/shared/ui/dnd.tsx';
import { Editable } from '@/shared/ui/editable.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { InputGroup } from '@/shared/ui/input-group.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import {
  DROPDOWN_FIELD_EMPTY_OPTIONS,
  DROPDOWN_FIELD_LABEL_WARNING,
  DropdownFieldOption,
  DropdownFieldState,
} from './model.ts';

export const DropdownFieldUI = createFieldUI<DropdownFieldState>({
  title: <Trans>Dropdown Select</Trans>,
  description: <Trans>Select from predefined options</Trans>,
  icon: <BsFillMenuButtonWideFill />,
  FieldPreview: reatomMemo(({ ctx, state }) => {
    const isCreatable = ctx.get(state.model.$isCreatable);
    const isMulti = ctx.get(state.model.$isMulti);

    const stateOptions = ctx.get(state.model.$options);

    const options = useMemo(() => {
      return stateOptions.map((option) => ({
        value: option.value,
        label: ctx.get(option.labelField.$value),
      }));
    }, [ctx, stateOptions]);

    const SelectComponent = isCreatable ? CreatableSelect : Select;

    return (
      <Field label={ctx.get(state.$name)} orientation={'horizontal'}>
        <SelectComponent isMulti={isMulti} options={options} />
      </Field>
    );
  }, 'NumericFieldUI.FieldPreview'),
  FieldContent: reatomMemo(({ ctx, state, issueManager }) => {
    return (
      <>
        <Flex gap={5}>
          <Flex flexDirection={'column'} gap={1} flex={1}>
            <IssueRenderer
              manager={issueManager}
              issueId={DROPDOWN_FIELD_EMPTY_OPTIONS}
              message={<Trans>You need to add at least one option.</Trans>}
            >
              <OptionsField state={state} />
              <AddOption state={state} issueManager={issueManager} />
            </IssueRenderer>
          </Flex>

          <Flex flexDirection={'column'} gap={2}>
            <Checkbox
              cursor={'pointer'}
              checked={ctx.spy(state.model.$isMulti)}
              onCheckedChange={(event) =>
                state.model.$isMulti(ctx, !!event.checked)
              }
            >
              <Trans>Can select multiple options</Trans>
            </Checkbox>

            <Checkbox
              cursor={'pointer'}
              checked={ctx.spy(state.model.$isCreatable)}
              onCheckedChange={(event) =>
                state.model.$isCreatable(ctx, !!event.checked)
              }
            >
              <Trans>Can create new options</Trans>
            </Checkbox>
          </Flex>
        </Flex>
      </>
    );
  }, 'DropdownFieldUI.FieldContent'),
});

type AddOptionProps = {
  state: DropdownFieldState;
  issueManager: FieldIssueManager;
};

const AddOption = reatomMemo<AddOptionProps>(({ ctx, state, issueManager }) => {
  return (
    <IssueRenderer
      manager={issueManager}
      issueId={DROPDOWN_FIELD_LABEL_WARNING}
      message={<Trans>Maybe you forgot to add the last option.</Trans>}
    >
      <Flex
        as={'form'}
        gap={2}
        alignItems={'center'}
        onSubmit={(event) => {
          event.preventDefault();

          state.model.add(ctx);
        }}
      >
        <Field invalid={!!ctx.spy(state.model.labelField.$error)}>
          <InputGroup
            width={'100%'}
            endElement={
              <Box as={'button'} cursor={'pointer'} color={'fg'}>
                <FaCheck />
              </Box>
            }
          >
            <Input
              placeholder={t`Enter option label`}
              value={ctx.spy(state.model.labelField.$value)}
              onChange={(event) =>
                state.model.labelField.$value(ctx, event.currentTarget.value)
              }
            />
          </InputGroup>
        </Field>
      </Flex>
    </IssueRenderer>
  );
}, 'AddOption');

type OptionsFieldProps = {
  state: DropdownFieldState;
};

const OptionsField = reatomMemo<OptionsFieldProps>(({ ctx, state }) => {
  const [values] = useAtom((ctx) =>
    ctx.spy(state.model.$options).map((option) => option.value),
  );

  return (
    <DndContext
      modifiers={[restrictToParentElement, restrictToVerticalAxis]}
      onDragEnd={({ active, over }) => {
        if (over) {
          state.model.move(ctx, active.id.toString(), over.id.toString());
        }
      }}
    >
      <SortableContext strategy={verticalListSortingStrategy} items={values}>
        {ctx.spy(state.model.$options).map((option) => (
          <Option key={option.value} option={option} state={state} />
        ))}
      </SortableContext>
    </DndContext>
  );
}, 'OptionsField');

type OptionProps = {
  state: DropdownFieldState;
  option: DropdownFieldOption;
};

const Option = reatomMemo<OptionProps>(({ ctx, option, state }) => {
  const isInvalid = !!ctx.spy(option.labelField.$error);

  return (
    <OptionDraggableWrapper option={option}>
      <Flex
        position={'absolute'}
        top={0}
        left={0}
        bottom={0}
        right={0}
        width={'100%'}
        height={'100%'}
      >
        <Flex
          flex={1}
          alignItems={'center'}
          justifyContent={'space-between'}
          borderColor={isInvalid ? 'border.error' : 'border'}
          borderWidth={1}
          borderStyle={'solid'}
          borderRadius={'md'}
          paddingBlock={1}
          paddingInline={1}
          backgroundColor={'bg'}
          width={'calc(100% - var(--chakra-sizes-9))'}
        >
          <Flex
            alignItems={'center'}
            width={'calc(100% - var(--chakra-sizes-8))'}
          >
            <Editable
              value={ctx.spy(option.labelField.$value)}
              onValueChange={ctx.bind(option.labelField.$value)}
              onBlur={() => {
                const validValue = option.labelField.validate(ctx);

                if (validValue) {
                  option.labelField.$value(ctx, validValue);
                }
              }}
            />
          </Flex>

          <Flex>
            <IconButton
              variant={'ghost'}
              size={'xs'}
              onClick={() => {
                state.model.remove(ctx, option.value);
              }}
            >
              <FaRegTrashAlt />
            </IconButton>
          </Flex>
        </Flex>

        <OptionDraggableActivator />
      </Flex>
    </OptionDraggableWrapper>
  );
}, 'Option');

type OptionDraggableWrapperProps = PropsWithChildren<{
  option: DropdownFieldOption;
}>;

const OptionDraggableWrapper = reatomMemo<OptionDraggableWrapperProps>(
  ({ option, children }) => {
    const value = useSortable({
      id: option.value,
    });

    const { setNodeRef, transition, transform, isDragging } = value;

    return (
      <Draggable value={value}>
        <Flex
          ref={setNodeRef}
          zIndex={isDragging ? 1 : undefined}
          transition={transition}
          transform={CSS.Transform.toString(transform)}
          alignItems={'center'}
          width={'100%'}
          position={'relative'}
          height={'40px'}
        >
          {children}
        </Flex>
      </Draggable>
    );
  },
  'OptionDraggableWrapper',
);

const OptionDraggableActivator = reatomMemo(() => {
  const { listeners, attributes, setActivatorNodeRef } = useDraggableContext();

  return (
    <IconButton
      {...listeners}
      {...attributes}
      ref={setActivatorNodeRef}
      variant={'ghost'}
      size={'sm'}
    >
      <MdDragIndicator />
    </IconButton>
  );
}, 'OptionDraggableActivator');
