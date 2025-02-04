import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { MdLink } from 'react-icons/md';

import { createFieldUI } from '@/shared/field-builder/field';

import { InternalLinkFieldState } from './model.ts';

export const InternalLinkFieldUI = createFieldUI<InternalLinkFieldState>({
  title: <Trans>Internal Link</Trans>,
  description: <Trans>Link to another collection item</Trans>,
  icon: <MdLink />,
  FieldContent: reatomComponent(({ ctx, state }) => {
    return <></>;
  }, 'InternalLinkFieldUI.FieldContent'),
});
