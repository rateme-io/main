import { Input } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { LuTextCursorInput } from 'react-icons/lu';

import { createFieldUI } from '@/shared/field-builder/field';
import { Field } from '@/shared/ui/field.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import { TextFieldState } from './model.ts';

export const TextFieldUI = createFieldUI<TextFieldState>({
  title: <Trans>Text Input</Trans>,
  description: <Trans>Input for plain text</Trans>,
  icon: <LuTextCursorInput />,
  FieldPreview: reatomMemo(
    ({ ctx, state }) => (
      <Field orientation={'horizontal'} label={ctx.spy(state.$name)}>
        <Input />
      </Field>
    ),
    'NumericFieldUI.FieldPreview',
  ),
  FieldContent: reatomMemo(() => {
    return <></>;
  }, 'TextFieldUI.FieldContent'),
});
