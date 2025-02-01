import { t } from '@lingui/core/macro';
import { reatomComponent } from '@reatom/npm-react';

import { Editable } from '@/shared/ui/editable.tsx';

import { FieldProps } from './common.tsx';
import { FieldContainer } from './common.tsx';

export const TextField = reatomComponent<FieldProps<'text'>>(
  ({ ctx, node }) => {
    return (
      <FieldContainer node={node}>
        <Editable
          required
          onValueChange={(nextValue) => node.state.$name(ctx, nextValue)}
          value={ctx.spy(node.state.$name)}
          placeholder={t`Field name`}
        />
      </FieldContainer>
    );
  },
  'TextField',
);
