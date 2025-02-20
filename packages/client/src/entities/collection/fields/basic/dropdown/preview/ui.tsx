import { CreatableSelect, Select } from 'chakra-react-select';
import { useMemo } from 'react';

import { createPreviewUI } from '@/shared/field-builder/field/preview';
import { Field } from '@/shared/ui/field.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import {
  DropdownFieldBuilderState,
  DropdownFieldOption,
} from '../builder/model.ts';
import { DropdownFieldPreviewState } from './model';

export const DropdownFieldPreviewUI = createPreviewUI<
  DropdownFieldBuilderState,
  DropdownFieldPreviewState
>({
  PreviewEditor: reatomMemo(({ ctx, builderState }) => {
    const isCreatable = ctx.spy(builderState.model.$isCreatable);
    const isMulti = ctx.spy(builderState.model.$isMulti);
    const stateOptions = ctx.spy(
      builderState.model.$options,
    ) as DropdownFieldOption[];

    const options = useMemo(() => {
      return stateOptions.map((option: DropdownFieldOption) => ({
        value: option.value,
        label: ctx.spy(option.labelField.$value),
      }));
    }, [ctx, stateOptions]);

    const SelectComponent = isCreatable ? CreatableSelect : Select;

    return (
      <Field label={ctx.spy(builderState.$name)} orientation={'horizontal'}>
        <SelectComponent isMulti={isMulti} options={options} />
      </Field>
    );
  }, 'DropdownFieldPreviewUI.PreviewEditor'),
  Preview: () => null,
});
