import { Trans } from '@lingui/react/macro';
import { LuExternalLink } from 'react-icons/lu';

import { createFieldUI } from '@/shared/field-builder/field';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { LinkFieldState } from './model.ts';

export const LinkFieldUI = createFieldUI<LinkFieldState>({
  title: <Trans>URL Input</Trans>,
  description: <Trans>Input for external links</Trans>,
  icon: <LuExternalLink />,
  comingSoon: true,
  FieldEditor: reatomMemo(() => null, 'NumericFieldUI.FieldEditor'),
  BuilderContent: reatomMemo(() => {
    return <></>;
  }, 'LinkFieldUI.BuilderContent'),
  FieldPreview: reatomMemo(({ ctx, builderState }) => {
    return (
      <FieldBuilder.ui.ValueRenderer
        title={ctx.spy(builderState.$name)}
        value={<></>}
      />
    );
  }, 'LinkFieldUI.FieldPreview'),
});
