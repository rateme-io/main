import { Trans } from '@lingui/react/macro';
import { FaLink } from 'react-icons/fa6';

import { createFieldGroup } from '@/shared/field-builder/group';

import { InternalLinkField } from './internal-link';
import { LinkField } from './link';

export const LinkFieldGroup = createFieldGroup({
  name: 'LinkFieldGroup',
  icon: <FaLink />,
  title: <Trans>Link Fields</Trans>,
  fields: [LinkField, InternalLinkField],
});
