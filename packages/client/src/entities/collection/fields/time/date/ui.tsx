import { Trans } from '@lingui/react/macro';
import { MdDateRange } from 'react-icons/md';

import { createFieldUI } from '@/shared/field-builder/field';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { DateFieldState } from './model.ts';

export const DateFieldUI = createFieldUI<DateFieldState>({
  title: <Trans>Date Picker</Trans>,
  description: <Trans>Select a date</Trans>,
  icon: <MdDateRange />,
  comingSoon: true,
  FieldEditor: reatomMemo(() => null, 'NumericFieldUI.FieldEditor'),
  BuilderContent: reatomMemo(() => {
    return <></>;
  }, 'DateFieldUI.BuilderContent'),
});
