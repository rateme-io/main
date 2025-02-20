import { Input } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { LuTextCursorInput } from 'react-icons/lu';

import { createFieldUI } from '@/shared/field-builder/field';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Field } from '@/shared/ui/field.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import { TextFieldState } from './model.ts';

export const TextFieldUI = createFieldUI<TextFieldState>({
  title: <Trans>Text Input</Trans>,
  description: <Trans>Input for plain text</Trans>,
  icon: <LuTextCursorInput />,
  FieldEditor: reatomMemo(
    ({ ctx, builderState }) => (
      <Field orientation={'horizontal'} label={ctx.spy(builderState.$name)}>
        <Input />
      </Field>
    ),
    'NumericFieldUI.FieldEditor',
  ),
  BuilderContent: reatomMemo(() => {
    return <></>;
  }, 'TextFieldUI.BuilderContent'),
  FieldPreview: reatomMemo(({ ctx, builderState }) => {
    return (
      <FieldBuilder.ui.ValueRenderer
        title={ctx.spy(builderState.$name)}
        value={<></>}
      />
    );
  }, 'TextFieldUI.FieldPreview'),
});
