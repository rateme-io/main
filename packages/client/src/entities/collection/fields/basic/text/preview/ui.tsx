import { createPreviewUI } from '@/shared/field-builder/field/preview';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import { TextFieldPreviewState } from './model';

export const TextFieldPreviewUI = createPreviewUI<TextFieldPreviewState>({
  Preview: reatomMemo(() => {
    return (
      <FieldBuilder.ui.ValueRenderer
        title={'Text Field'}
        value={<></>}
      />
    );
  }, 'TextFieldUI.Preview'),
}); 