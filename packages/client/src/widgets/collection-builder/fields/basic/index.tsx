import { Trans } from '@lingui/react/macro';
import { LuTextCursorInput } from 'react-icons/lu';

import { createFieldGroup } from '@/shared/field-builder/group';

import { TextField } from './text';

export const BasicFieldGroup = createFieldGroup({
  name: 'BasicFieldGroup',
  icon: <LuTextCursorInput />,
  title: <Trans>Basic Fields</Trans>,
  fields: [TextField],
});
