import { Trans } from '@lingui/react/macro';
import { FaImages } from 'react-icons/fa6';

import { createFieldUI } from '@/shared/field-builder/field';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { ImagesFieldState } from './model.ts';

export const ImagesFieldUI = createFieldUI<ImagesFieldState>({
  title: <Trans>Image Upload</Trans>,
  description: <Trans>Upload and manage images</Trans>,
  comingSoon: true,
  icon: <FaImages />,
  FieldPreview: reatomMemo(() => null, 'NumericFieldUI.FieldPreview'),
  FieldContent: reatomMemo(() => {
    return <></>;
  }, 'ImagesFieldUI.FieldContent'),
});
