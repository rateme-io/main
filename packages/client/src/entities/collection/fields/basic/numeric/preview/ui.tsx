import { Input } from '@chakra-ui/react';

import { createPreviewUI } from '@/shared/field-builder/field/preview';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Field } from '@/shared/ui/field.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import { NumericFieldBuilderState } from '../builder/model';
import { NumericFieldPreviewState } from './model';

export const NumericFieldPreviewUI = createPreviewUI<
  NumericFieldBuilderState,
  NumericFieldPreviewState
>({
  PreviewEditor: reatomMemo(
    ({ ctx, builderState, previewState }) => (
      <Field orientation={'horizontal'} label={ctx.spy(builderState.$name)}>
        <Input
          value={ctx.spy(previewState.$value)}
          onChange={(event) =>
            previewState.$value(ctx, parseFloat(event.currentTarget.value))
          }
          type={'number'}
          min={
            ctx.spy(builderState.min.$enabled)
              ? (ctx.spy(builderState.min.$value) ?? undefined)
              : undefined
          }
          max={
            ctx.spy(builderState.max.$enabled)
              ? (ctx.spy(builderState.max.$value) ?? undefined)
              : undefined
          }
        />
      </Field>
    ),
    'NumericFieldPreviewUI.PreviewEditor',
  ),
  Preview: reatomMemo(({ ctx, previewState, builderState }) => {
    return (
      <FieldBuilder.ui.ValueRenderer title={ctx.spy(builderState.$name)}>
        {ctx.spy(previewState.$value)}
      </FieldBuilder.ui.ValueRenderer>
    );
  }, 'NumericFieldUI.Preview'),
});
