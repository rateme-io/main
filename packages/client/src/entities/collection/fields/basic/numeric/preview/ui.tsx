import { createPreviewUI } from '@/shared/field-builder/field/preview';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import { NumericFieldPreviewState } from './model';

export const NumericFieldPreviewUI = createPreviewUI<NumericFieldPreviewState>({
  Preview: reatomMemo(() => {
    return (
      <FieldBuilder.ui.ValueRenderer title={'Numeric Field'} value={<></>} />
    );
  }, 'NumericFieldUI.Preview'),
}); 