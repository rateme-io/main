import { Flex, Input, InputProps, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { AtomMut } from '@reatom/framework';
import { ReactNode } from 'react';
import { TiSortNumerically } from 'react-icons/ti';

import { createFieldUI, FieldIssueManager } from '@/shared/field-builder/field';
import { IssueRenderer } from '@/shared/field-builder/manager';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import { Field } from '@/shared/ui/field.tsx';
import { reatomMemo } from '@/shared/ui/reatom-memo';

import {
  NUMERIC_FIELD_EMPTY_MAX_ISSUE,
  NUMERIC_FIELD_EMPTY_MIN_ISSUE,
  NUMERIC_FIELD_MIN_GREATER_THAN_MAX_ISSUE,
  NumericFieldState,
} from './model.ts';

export const NumericFieldUI = createFieldUI<NumericFieldState>({
  title: <Trans>Number Input</Trans>,
  description: <Trans>Input for numeric values</Trans>,
  icon: <TiSortNumerically />,
  FieldPreview: reatomMemo(
    ({ ctx, state }) => (
      <Field orientation={'horizontal'} label={ctx.get(state.$name)}>
        <Input
          type={'number'}
          min={
            ctx.get(state.min.$enabled)
              ? (ctx.get(state.min.$value) ?? undefined)
              : undefined
          }
          max={
            ctx.get(state.max.$enabled)
              ? (ctx.get(state.max.$value) ?? undefined)
              : undefined
          }
        />
      </Field>
    ),
    'NumericFieldUI.FieldPreview',
  ),
  FieldContent: reatomMemo(({ ctx, state, issueManager }) => {
    return (
      <IssueRenderer
        manager={issueManager}
        issueId={NUMERIC_FIELD_MIN_GREATER_THAN_MAX_ISSUE}
        message={<Trans>Min value should be less than max value.</Trans>}
      >
        <Flex gap={2}>
          <NumberInput
            issueId={NUMERIC_FIELD_EMPTY_MIN_ISSUE}
            issueMessage={
              <Trans>
                You enabled min input but haven&#39;t typed a value.
              </Trans>
            }
            issueManager={issueManager}
            label={<Trans>Min</Trans>}
            $enabled={state.min.$enabled}
            $value={state.min.$value}
            inputProps={{
              max: ctx.spy(state.max.$value) ?? undefined,
            }}
          />

          <NumberInput
            issueId={NUMERIC_FIELD_EMPTY_MAX_ISSUE}
            issueMessage={
              <Trans>
                You enabled max input but haven&#39;t typed a value.
              </Trans>
            }
            issueManager={issueManager}
            label={<Trans>Max</Trans>}
            $enabled={state.max.$enabled}
            $value={state.max.$value}
            inputProps={{
              min: ctx.spy(state.min.$value) ?? undefined,
            }}
          />
        </Flex>
      </IssueRenderer>
    );
  }, 'NumericFieldUI.FieldContent'),
});

const NumberInput = reatomMemo<{
  label: ReactNode;
  $enabled: AtomMut<boolean>;
  $value: AtomMut<number | null>;
  inputProps: InputProps;
  issueManager: FieldIssueManager;
  issueId: symbol;
  issueMessage: ReactNode;
}>(
  ({
    ctx,
    label,
    $value,
    $enabled,
    inputProps,
    issueManager,
    issueId,
    issueMessage,
  }) => {
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
        <IssueRenderer
          manager={issueManager}
          issueId={issueId}
          message={issueMessage}
        >
          <Input
            {...inputProps}
            type={'number'}
            disabled={!ctx.spy($enabled)}
            value={ctx.spy($value) ?? undefined}
            onChange={(event) =>
              $value(ctx, parseFloat(event.currentTarget.value))
            }
          />
        </IssueRenderer>
      </Field>
    );
  },
  'NumberInput',
);
