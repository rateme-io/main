import { Trans } from '@lingui/react/macro';
import { IoIosTimer } from 'react-icons/io';

import { createFieldUI } from '@/shared/field-builder/field';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { DurationFieldState } from './model.ts';

export const DurationFieldUI = createFieldUI<DurationFieldState>({
  title: <Trans>Duration Input</Trans>,
  description: <Trans>Input for time duration</Trans>,
  icon: <IoIosTimer />,
  comingSoon: true,
  FieldPreview: reatomMemo(() => null, 'NumericFieldUI.FieldPreview'),
  FieldContent: reatomMemo(() => {
    return <></>;
  }, 'DurationFieldUI.FieldContent'),
});
