import { Input } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { LuTextCursorInput } from 'react-icons/lu';

import { createFieldUI } from '@/shared/field-builder/field';
import { Field } from '@/shared/ui/field.tsx';

import { TextFieldState } from './model.ts';

export const TextFieldUI = createFieldUI<TextFieldState>({
  title: <Trans>Text Input</Trans>,
  description: <Trans>Input for plain text</Trans>,
  icon: <LuTextCursorInput />,
  FieldPreview: reatomComponent(
    ({ ctx, state }) => (
      <Field orientation={'horizontal'} label={ctx.get(state.$name)}>
        <Input />
      </Field>
    ),
    'NumericFieldUI.FieldPreview',
  ),
  FieldContent: reatomComponent(() => {
    return <></>;
  }, 'TextFieldUI.FieldContent'),
});
