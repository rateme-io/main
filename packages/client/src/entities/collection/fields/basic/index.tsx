import { Trans } from '@lingui/react/macro';
import { LuTextCursorInput } from 'react-icons/lu';

import { createFieldGroup } from '@/shared/field-builder/group';

import { DropdownField } from './dropdown';
import { NumericField } from './numeric';
import { TextField } from './text';

export const BasicFieldGroup = createFieldGroup({
  name: 'BasicFieldGroup',
  icon: <LuTextCursorInput />,
  title: <Trans>Standard Fields</Trans>,
  fields: [TextField, NumericField, DropdownField],
});
