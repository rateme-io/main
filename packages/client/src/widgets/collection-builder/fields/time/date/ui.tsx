import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { MdDateRange } from 'react-icons/md';

import { createFieldUI } from '@/shared/field-builder/field';

import { DateFieldState } from './model.ts';

export const DateFieldUI = createFieldUI<DateFieldState>({
  title: <Trans>Date Picker</Trans>,
  description: <Trans>Select a date</Trans>,
  icon: <MdDateRange />,
  comingSoon: true,
  FieldPreview: reatomComponent(() => null, 'NumericFieldUI.FieldPreview'),
  FieldContent: reatomComponent(() => {
    return <></>;
  }, 'DateFieldUI.FieldContent'),
});
