import { Trans } from '@lingui/react/macro';
import { FaClock } from 'react-icons/fa6';

import { createFieldGroup } from '@/shared/field-builder/group';

import { DateField } from './date';
import { DurationField } from './duration';

export const TimeFieldGroup = createFieldGroup({
  name: 'TimeFieldGroup',
  icon: <FaClock />,
  title: <Trans>Time Fields</Trans>,
  fields: [DateField, DurationField],
});
