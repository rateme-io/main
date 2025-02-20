import { Trans } from '@lingui/react/macro';
import { FaImages } from 'react-icons/fa6';

import { createFieldUI } from '@/shared/field-builder/field';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { ImagesFieldState } from './model.ts';

export const ImagesFieldUI = createFieldUI<ImagesFieldState>({
  title: <Trans>Image Upload</Trans>,
  description: <Trans>Upload and manage images</Trans>,
  comingSoon: true,
  icon: <FaImages />,
  FieldEditor: reatomMemo(() => null, 'NumericFieldUI.FieldEditor'),
  BuilderContent: reatomMemo(() => {
    return <></>;
  }, 'ImagesFieldUI.BuilderContent'),
  FieldPreview: reatomMemo(({ ctx, builderState }) => {
    return (
      <FieldBuilder.ui.ValueRenderer
        title={ctx.spy(builderState.$name)}
        value={<></>}
      />
    );
  }, 'ImagesFieldUI.FieldPreview'),
});
