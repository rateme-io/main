import { Flex, Input, InputProps, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { AtomMut } from '@reatom/framework';
import { ReactNode } from 'react';
import { TiSortNumerically } from 'react-icons/ti';

import { NumberAtom } from '@/shared/atoms/number-atom.ts';
import { createBuilderUI } from '@/shared/field-builder/field/builder';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import {
  NUMERIC_FIELD_EMPTY_MAX_ISSUE,
  NUMERIC_FIELD_EMPTY_MIN_ISSUE,
  NUMERIC_FIELD_MIN_GREATER_THAN_MAX_ISSUE,
  NumericFieldBuilderState,
} from './model';

export const NumericFieldBuilderUI = createBuilderUI<NumericFieldBuilderState>({
  title: <Trans>Number Input</Trans>,
  description: <Trans>Input for numeric values</Trans>,
  icon: <TiSortNumerically />,

  BuilderContent: reatomMemo(({ ctx, builderState }) => {
    return (
      <FieldBuilder.ui.IssueRenderer
        issueId={NUMERIC_FIELD_MIN_GREATER_THAN_MAX_ISSUE}
        message={<Trans>Min value should be less than max value.</Trans>}
        placement={['top', 'bottom']}
      >
        <Flex gap={2}>
          <NumberInput
            issueId={NUMERIC_FIELD_EMPTY_MIN_ISSUE}
            issueMessage={
              <Trans>
                You enabled min input but haven&#39;t typed a value.
              </Trans>
            }
            label={<Trans>Min</Trans>}
            $enabled={builderState.min.$enabled}
            $value={builderState.min.$value}
            inputProps={{
              max: ctx.spy(builderState.max.$value) ?? undefined,
            }}
          />

          <NumberInput
            issueId={NUMERIC_FIELD_EMPTY_MAX_ISSUE}
            issueMessage={
              <Trans>
                You enabled max input but haven&#39;t typed a value.
              </Trans>
            }
            label={<Trans>Max</Trans>}
            $enabled={builderState.max.$enabled}
            $value={builderState.max.$value}
            inputProps={{
              min: ctx.spy(builderState.min.$value) ?? undefined,
            }}
          />
        </Flex>
      </FieldBuilder.ui.IssueRenderer>
    );
  }, 'NumericFieldUI.BuilderContent'),
});

const NumberInput = reatomMemo<{
  label: ReactNode;
  $enabled: AtomMut<boolean>;
  $value: NumberAtom;
  inputProps: InputProps;
  issueId: symbol;
  issueMessage: ReactNode;
}>(({ ctx, label, $value, $enabled, inputProps, issueId, issueMessage }) => {
  return (
    <Field
      label={
        <Flex gap={2}>
          <Checkbox
            checked={ctx.spy($enabled)}
            onCheckedChange={(event) => $enabled(ctx, !!event.checked)}
          />

          <Text>{label}</Text>
        </Flex>
      }
    >
      <FieldBuilder.ui.IssueRenderer
        issueId={issueId}
        message={issueMessage}
        containerProps={{ width: '100%' }}
      >
        <Input
          {...inputProps}
          type={'number'}
          disabled={!ctx.spy($enabled)}
          value={ctx.spy($value) ?? undefined}
          onChange={(event) => {
            return $value(ctx, event.currentTarget.value);
          }}
        />
      </FieldBuilder.ui.IssueRenderer>
    </Field>
  );
}, 'NumberInput');
