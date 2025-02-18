import { Trans } from '@lingui/react/macro';
import { MdLink } from 'react-icons/md';

import { createFieldUI } from '@/shared/field-builder/field';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { InternalLinkFieldState } from './model.ts';

export const InternalLinkFieldUI = createFieldUI<InternalLinkFieldState>({
  title: <Trans>Internal Link</Trans>,
  description: <Trans>Link to another collection item</Trans>,
  icon: <MdLink />,
  comingSoon: true,
  FieldPreview: reatomMemo(() => null, 'NumericFieldUI.FieldPreview'),
  FieldContent: reatomMemo(() => {
    return <></>;
  }, 'InternalLinkFieldUI.FieldContent'),
});
