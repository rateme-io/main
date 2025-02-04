import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { LuExternalLink } from 'react-icons/lu';

import { createFieldUI } from '@/shared/field-builder/field';

import { LinkFieldState } from './model.ts';

export const LinkFieldUI = createFieldUI<LinkFieldState>({
  title: <Trans>URL Input</Trans>,
  description: <Trans>Input for external links</Trans>,
  icon: <LuExternalLink />,
  FieldContent: reatomComponent(({ ctx, state }) => {
    return <></>;
  }, 'LinkFieldUI.FieldContent'),
});
