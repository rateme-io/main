import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { IoIosTimer } from 'react-icons/io';

import { createFieldUI } from '@/shared/field-builder/field';

import { DurationFieldState } from './model.ts';

export const DurationFieldUI = createFieldUI<DurationFieldState>({
  title: <Trans>Duration Input</Trans>,
  description: <Trans>Input for time duration</Trans>,
  icon: <IoIosTimer />,
  FieldContent: reatomComponent(({ ctx, state }) => {
    return <></>;
  }, 'DurationFieldUI.FieldContent'),
});
