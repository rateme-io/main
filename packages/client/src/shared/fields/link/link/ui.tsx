import { Trans } from '@lingui/react/macro';
import { LuExternalLink } from 'react-icons/lu';

import { createFieldUI } from '@/shared/field-builder/field';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { LinkFieldState } from './model.ts';

export const LinkFieldUI = createFieldUI<LinkFieldState>({
  title: <Trans>URL Input</Trans>,
  description: <Trans>Input for external links</Trans>,
  icon: <LuExternalLink />,
  comingSoon: true,
  FieldPreview: reatomMemo(() => null, 'NumericFieldUI.FieldPreview'),
  FieldContent: reatomMemo(() => {
    return <></>;
  }, 'LinkFieldUI.FieldContent'),
});
