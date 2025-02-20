import { Input } from '@chakra-ui/react';

import { createPreviewUI } from '@/shared/field-builder/field/preview';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Field } from '@/shared/ui/field.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import { TextFieldBuilderState } from '../builder/model';
import { TextFieldPreviewState } from './model';

export const TextFieldPreviewUI = createPreviewUI<
  TextFieldBuilderState,
  TextFieldPreviewState
>({
  PreviewEditor: reatomMemo(
    ({ ctx, builderState }) => (
      <Field orientation={'horizontal'} label={ctx.spy(builderState.$name)}>
        <Input />
      </Field>
    ),
    'TextFieldPreviewUI.PreviewEditor',
  ),
  Preview: reatomMemo(() => {
    return <FieldBuilder.ui.ValueRenderer title={'Text Field'} value={<></>} />;
  }, 'TextFieldUI.Preview'),
});
