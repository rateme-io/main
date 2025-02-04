import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { FaImages } from 'react-icons/fa6';

import { createFieldUI } from '@/shared/field-builder/field';

import { ImagesFieldState } from './model.ts';

export const ImagesFieldUI = createFieldUI<ImagesFieldState>({
  title: <Trans>Image Upload</Trans>,
  description: <Trans>Upload and manage images</Trans>,
  comingSoon: true,
  icon: <FaImages />,
  FieldPreview: reatomComponent(() => null, 'NumericFieldUI.FieldPreview'),
  FieldContent: reatomComponent(() => {
    return <></>;
  }, 'ImagesFieldUI.FieldContent'),
});
