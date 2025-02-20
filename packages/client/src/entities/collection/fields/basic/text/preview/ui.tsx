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
    ({ ctx, builderState, previewState }) => (
      <Field orientation={'horizontal'} label={ctx.spy(builderState.$name)}>
        <Input
          value={ctx.spy(previewState.$value)}
          onChange={(event) =>
            previewState.$value(ctx, event.currentTarget.value)
          }
        />
      </Field>
    ),
    'TextFieldPreviewUI.PreviewEditor',
  ),
  Preview: reatomMemo(({ ctx, builderState, previewState }) => {
    return (
      <FieldBuilder.ui.ValueRenderer title={ctx.spy(builderState.$name)}>
        {ctx.spy(previewState.$value)}
      </FieldBuilder.ui.ValueRenderer>
    );
  }, 'TextFieldUI.Preview'),
});
