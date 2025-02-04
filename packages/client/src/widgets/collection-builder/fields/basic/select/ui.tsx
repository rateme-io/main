import { Box, Flex, IconButton, Input } from '@chakra-ui/react';
import { DndContext } from '@dnd-kit/core';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { reatomComponent, useAtom } from '@reatom/npm-react';
import { CreatableSelect, Select } from 'chakra-react-select';
import { useMemo } from 'react';
import { BsFillMenuButtonWideFill } from 'react-icons/bs';
import { FaCheck } from 'react-icons/fa6';
import { MdDragIndicator, MdOutlineRemove } from 'react-icons/md';

import { createFieldUI } from '@/shared/field-builder/field';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import { Editable } from '@/shared/ui/editable.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { InputGroup } from '@/shared/ui/input-group.tsx';

import { DropdownFieldOption, DropdownFieldState } from './model.ts';

export const DropdownFieldUI = createFieldUI<DropdownFieldState>({
  title: <Trans>Dropdown Select</Trans>,
  description: <Trans>Select from predefined options</Trans>,
  icon: <BsFillMenuButtonWideFill />,
  FieldPreview: reatomComponent(({ ctx, state }) => {
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
  FieldContent: reatomComponent(({ ctx, state }) => {
    return (
      <>
        <Flex gap={5}>
          <Flex flexDirection={'column'} gap={1} maxWidth={'50%'}>
            <OptionsField state={state} />
            <AddOption state={state} />
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
};

const AddOption = reatomComponent<AddOptionProps>(({ ctx, state }) => {
  return (
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
            <Box as={'button'} cursor={'pointer'}>
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
  );
}, 'AddOption');

type OptionsFieldProps = {
  state: DropdownFieldState;
};

const OptionsField = reatomComponent<OptionsFieldProps>(({ ctx, state }) => {
  const [values] = useAtom((ctx) =>
    ctx.spy(state.model.$options).map((option) => option.value),
  );

  return (
    <DndContext
      onDragEnd={({ active, over }) => {
        if (over) {
          state.model.move(ctx, active.id.toString(), over.id.toString());
        }
      }}
    >
      <SortableContext strategy={verticalListSortingStrategy} items={values}>
        {ctx.spy(state.model.$options).map((option) => (
          <Option
            key={option.value}
            option={option}
            onRemove={() => {
              state.model.remove(ctx, option.value);
            }}
          />
        ))}
      </SortableContext>
    </DndContext>
  );
}, 'OptionsField');

type OptionProps = {
  option: DropdownFieldOption;
  onRemove: () => void;
};

const Option = reatomComponent<OptionProps>(({ ctx, option, onRemove }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: option.value,
  });

  const isInvalid = !!ctx.spy(option.labelField.$error);

  return (
    <Flex
      ref={setNodeRef}
      zIndex={isDragging ? 1 : undefined}
      transition={transition}
      transform={CSS.Transform.toString(transform)}
      alignItems={'center'}
      justifyContent={'space-between'}
      borderColor={isInvalid ? 'red.500' : 'gray.100'}
      borderWidth={2}
      borderStyle={'solid'}
      borderRadius={'md'}
      paddingBlock={1}
      paddingInline={1}
      backgroundColor={'white'}
      maxWidth={'100%'}
    >
      <Flex alignItems={'center'}>
        <IconButton
          {...listeners}
          {...attributes}
          ref={setActivatorNodeRef}
          variant={'ghost'}
          size={'sm'}
        >
          <MdDragIndicator />
        </IconButton>

        <Editable
          value={ctx.spy(option.labelField.$value)}
          onValueChange={(value) => option.labelField.$value(ctx, value)}
          onBlur={() => {
            const validValue = option.labelField.validate(ctx);

            if (validValue) {
              option.labelField.$value(ctx, validValue);
            }
          }}
        />
      </Flex>

      <Flex>
        <IconButton variant={'ghost'} size={'sm'} onClick={onRemove}>
          <MdOutlineRemove />
        </IconButton>
      </Flex>
    </Flex>
  );
}, 'Option');
