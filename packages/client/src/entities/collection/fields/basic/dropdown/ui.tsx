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

import { createFieldUI } from '@/shared/field-builder/field';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import { Draggable, useDraggableContext } from '@/shared/ui/dnd.tsx';
import { Editable } from '@/shared/ui/editable.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { InputGroup } from '@/shared/ui/input-group.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import {
  DROPDOWN_FIELD_EMPTY_OPTION_LABEL,
  DROPDOWN_FIELD_EMPTY_OPTIONS,
  DROPDOWN_FIELD_LABEL_WARNING,
  DropdownFieldOption,
  DropdownFieldState,
} from './model.ts';

export const DropdownFieldUI = createFieldUI<DropdownFieldState>({
  title: <Trans>Dropdown Select</Trans>,
  description: <Trans>The field that displays the drop-down list</Trans>,
  icon: <BsFillMenuButtonWideFill />,
  FieldPreview: reatomMemo(({ ctx, state }) => {
    const isCreatable = ctx.spy(state.model.$isCreatable);
    const isMulti = ctx.spy(state.model.$isMulti);

    const stateOptions = ctx.spy(state.model.$options);

    const options = useMemo(() => {
      return stateOptions.map((option) => ({
        value: option.value,
        label: ctx.spy(option.labelField.$value),
      }));
    }, [ctx, stateOptions]);

    const SelectComponent = isCreatable ? CreatableSelect : Select;

    return (
      <Field label={ctx.spy(state.$name)} orientation={'horizontal'}>
        <SelectComponent isMulti={isMulti} options={options} />
      </Field>
    );
  }, 'NumericFieldUI.FieldPreview'),
  FieldContent: reatomMemo(({ ctx, state }) => {
    return (
      <>
        <Flex gap={5} flex={1}>
          <Flex flexDirection={'column'} flex={1} asChild>
            <FieldBuilder.ui.IssueRenderer
              issueId={DROPDOWN_FIELD_EMPTY_OPTIONS}
              message={<Trans>You need to add at least one option.</Trans>}
            >
              <OptionsField state={state} />
              <AddOption state={state} />
            </FieldBuilder.ui.IssueRenderer>
          </Flex>

          <Flex flexDirection={'column'} gap={2}>
            <Checkbox
              cursor={'pointer'}
              checked={ctx.spy(state.model.$isMulti)}
              onCheckedChange={(event) =>
                state.model.$isMulti(ctx, !!event.checked)
              }
            >
              <Trans>Allow multiple selections</Trans>
            </Checkbox>

            <Checkbox
              cursor={'pointer'}
              checked={ctx.spy(state.model.$isCreatable)}
              onCheckedChange={(event) =>
                state.model.$isCreatable(ctx, !!event.checked)
              }
            >
              <Trans>Allow adding custom options</Trans>
            </Checkbox>
          </Flex>
        </Flex>
      </>
    );
  }, 'DropdownFieldUI.FieldContent'),
});

type AddOptionProps = {
  state: DropdownFieldState;
};

const AddOption = reatomMemo<AddOptionProps>(({ ctx, state }) => {
  return (
    <FieldBuilder.ui.IssueRenderer
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
              placeholder={t`Enter a name for this option`}
              value={ctx.spy(state.model.labelField.$value)}
              onChange={(event) =>
                state.model.labelField.$value(ctx, event.currentTarget.value)
              }
              onBlur={() => {
                state.model.blur(ctx);
              }}
            />
          </InputGroup>
        </Field>
      </Flex>
    </FieldBuilder.ui.IssueRenderer>
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
  return (
    <OptionDraggableWrapper option={option}>
      <FieldBuilder.ui.IssueRenderer
        issueId={DROPDOWN_FIELD_EMPTY_OPTION_LABEL}
        issueKey={option.value}
        message={
          <Trans>The option label cannot be empty. Please enter a value.</Trans>
        }
        containerProps={{
          width: '100%',
          height: '100%',
        }}
      >
        <Flex
          position={'absolute'}
          top={0}
          left={0}
          bottom={0}
          right={0}
          width={'100%'}
          height={'100%'}
          alignItems={'center'}
          gap={1}
        >
          <Flex
            flex={1}
            alignItems={'center'}
            justifyContent={'space-between'}
            borderColor={'border'}
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
                placeholder={<Trans>Option label</Trans>}
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
      </FieldBuilder.ui.IssueRenderer>
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
          marginBottom={3}
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
      size={'xs'}
      padding={1}
    >
      <MdDragIndicator />
    </IconButton>
  );
}, 'OptionDraggableActivator');
