import { Trans } from '@lingui/react/macro';
import { LuTextCursorInput } from 'react-icons/lu';

import { createBuilderUI } from '@/shared/field-builder/field/builder';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import { TextFieldBuilderState } from './model';

export const TextFieldBuilderUI = createBuilderUI<TextFieldBuilderState>({
  title: <Trans>Text Input</Trans>,
  description: <Trans>Input for plain text</Trans>,
  icon: <LuTextCursorInput />,
  BuilderContent: reatomMemo(() => {
    return <></>;
  }, 'TextFieldUI.BuilderContent'),
});
