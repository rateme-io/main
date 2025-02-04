import { Trans } from '@lingui/react/macro';
import { FaImages } from 'react-icons/fa6';

import { createFieldGroup } from '@/shared/field-builder/group';

import { ImagesField } from './images';

export const ImageFieldGroup = createFieldGroup({
  name: 'ImageFieldGroup',
  icon: <FaImages />,
  title: <Trans>Image Fields</Trans>,
  fields: [ImagesField],
});
