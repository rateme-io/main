import { Flex, Tag, Text } from '@chakra-ui/react';
import { CreatableSelect, Select } from 'chakra-react-select';
import { useMemo } from 'react';

import { createPreviewUI } from '@/shared/field-builder/field/preview';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Field } from '@/shared/ui/field.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import {
  DropdownBuilderOption,
  DropdownFieldBuilderState,
} from '../builder/model.ts';
import { DropdownFieldPreviewState, DropdownPreviewOption } from './model';

export const DropdownFieldPreviewUI = createPreviewUI<
  DropdownFieldBuilderState,
  DropdownFieldPreviewState
>({
  PreviewEditor: reatomMemo(({ ctx, builderState, previewState }) => {
    const isCreatable = ctx.spy(builderState.model.$isCreatable);
    const isMulti = ctx.spy(builderState.model.$isMulti);
    const stateOptions = ctx.spy(builderState.model.$options);

    const options = useMemo<DropdownPreviewOption[]>(() => {
      return stateOptions.map((option: DropdownBuilderOption) => ({
        value: option.value,
        label: ctx.spy(option.labelField.$value),
      }));
    }, [ctx, stateOptions]);

    const SelectComponent = isCreatable ? CreatableSelect : Select;

    const value = isMulti
      ? ctx.spy(previewState.$value)
      : ctx.spy(previewState.$value).at(0);

    return (
      <Field label={ctx.spy(builderState.$name)} orientation={'horizontal'}>
        <SelectComponent
          isMulti={isMulti}
          options={options}
          value={value}
          onChange={(newValue) => {
            if (Array.isArray(newValue)) {
              previewState.$value(ctx, newValue);
            } else {
              previewState.$value(
                ctx,
                newValue ? [newValue as DropdownPreviewOption] : [],
              );
            }
          }}
        />
      </Field>
    );
  }, 'DropdownFieldPreviewUI.PreviewEditor'),
  Preview: reatomMemo(({ ctx, builderState, previewState }) => {
    const isMulti = ctx.spy(builderState.model.$isMulti);

    const value = ctx.spy(previewState.$value);

    const type = value.length === 0 ? 'empty' : isMulti ? 'multi' : 'single';

    return (
      <FieldBuilder.ui.ValueRenderer title={ctx.spy(builderState.$name)}>
        {
          {
            empty: <Text>empty</Text>,
            single: <Text>{ctx.spy(previewState.$value).at(0)?.label}</Text>,
            multi: (
              <Flex gap={1} flexWrap={'wrap'}>
                {value.map((option) => (
                  <Tag.Root key={option.value}>
                    <Tag.Label>{option.label}</Tag.Label>
                  </Tag.Root>
                ))}
              </Flex>
            ),
          }[type]
        }
      </FieldBuilder.ui.ValueRenderer>
    );
  }, 'DropdownFieldPreviewUI.Preview'),
});
