import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { LuTextCursorInput } from 'react-icons/lu';

import { createFieldUI } from '@/shared/field-builder/field';
import { Editable } from '@/shared/ui/editable.tsx';

import { TextFieldState } from './model.ts';

export const TextFieldUI = createFieldUI<TextFieldState>({
  title: <Trans>Text Input</Trans>,
  description: <Trans>Input for plain text</Trans>,
  icon: <LuTextCursorInput />,
  FieldContent: reatomComponent(({ ctx, state }) => {
    return (
      <>
        <Editable
          onValueChange={ctx.bind(state.$name)}
          value={ctx.spy(state.$name)}
          placeholder={t`Enter field name`}
        />
      </>
    );
  }, 'TextFieldUI.FieldContent'),
});
