import { Trans } from '@lingui/react/macro';
import { IoIosTimer } from 'react-icons/io';

import { createFieldUI } from '@/shared/field-builder/field';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { DurationFieldState } from './model.ts';

export const DurationFieldUI = createFieldUI<DurationFieldState>({
  title: <Trans>Duration Input</Trans>,
  description: <Trans>Input for time duration</Trans>,
  icon: <IoIosTimer />,
  comingSoon: true,
  FieldEditor: reatomMemo(() => null, 'NumericFieldUI.FieldEditor'),
  BuilderContent: reatomMemo(() => {
    return <></>;
  }, 'DurationFieldUI.BuilderContent'),
  FieldPreview: reatomMemo(({ ctx, builderState }) => {
    return (
      <FieldBuilder.ui.ValueRenderer
        title={ctx.spy(builderState.$name)}
        value={<></>}
      />
    );
  }, 'DurationFieldUI.FieldPreview'),
});
