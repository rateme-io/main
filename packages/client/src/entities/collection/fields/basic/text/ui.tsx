import { Input } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { LuTextCursorInput } from 'react-icons/lu';

import { createBuilderUI } from '@/shared/field-builder/field/builder/ui';
import { createPreviewUI } from '@/shared/field-builder/field/preview/ui';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Field } from '@/shared/ui/field.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import { TextFieldBuilderState, TextFieldPreviewState } from './model.ts';

export const TextFieldBuilderUI = createBuilderUI<TextFieldBuilderState>({
  title: <Trans>Text Input</Trans>,
  description: <Trans>Input for plain text</Trans>,
  icon: <LuTextCursorInput />,
  FieldEditor: reatomMemo(
    ({ ctx, builderState }) => (
      <Field orientation={'horizontal'} label={ctx.spy(builderState.$name)}>
        <Input />
      </Field>
    ),
    'TextFieldUI.FieldEditor',
  ),
  BuilderContent: reatomMemo(() => {
    return <></>;
  }, 'TextFieldUI.BuilderContent'),
});

export const TextFieldPreviewUI = createPreviewUI<TextFieldPreviewState>({
  Preview: reatomMemo(() => {
    return (
      <FieldBuilder.ui.ValueRenderer
        title={'Text Field'}
        value={<></>}
      />
    );
  }, 'TextFieldUI.Preview'),
});
