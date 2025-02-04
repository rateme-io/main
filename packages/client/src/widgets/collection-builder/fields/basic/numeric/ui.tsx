import { Flex, Input, InputProps, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { AtomMut } from '@reatom/framework';
import { reatomComponent } from '@reatom/npm-react';
import { ReactNode } from 'react';
import { TiSortNumerically } from 'react-icons/ti';

import { createFieldUI } from '@/shared/field-builder/field';
import { Checkbox } from '@/shared/ui/checkbox.tsx';
import { Field } from '@/shared/ui/field.tsx';

import { NumericFieldState } from './model.ts';

export const NumericFieldUI = createFieldUI<NumericFieldState>({
  title: <Trans>Number Input</Trans>,
  description: <Trans>Input for numeric values</Trans>,
  icon: <TiSortNumerically />,
  FieldContent: reatomComponent(({ ctx, state }) => {
    return (
      <>
        <Flex gap={2}>
          <NumberInput
            label={<Trans>Min</Trans>}
            $enabled={state.min.$enabled}
            $value={state.min.$value}
            inputProps={{
              max: ctx.spy(state.max.$value) ?? undefined,
            }}
          />

          <NumberInput
            label={<Trans>Max</Trans>}
            $enabled={state.max.$enabled}
            $value={state.max.$value}
            inputProps={{
              min: ctx.spy(state.min.$value) ?? undefined,
            }}
          />
        </Flex>
      </>
    );
  }, 'NumericFieldUI.FieldContent'),
});

const NumberInput = reatomComponent<{
  label: ReactNode;
  $enabled: AtomMut<boolean>;
  $value: AtomMut<number | null>;
  inputProps: InputProps;
}>(({ ctx, label, $value, $enabled, inputProps }) => {
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
      <Input
        {...inputProps}
        type={'number'}
        disabled={!ctx.spy($enabled)}
        value={ctx.spy($value) ?? undefined}
        onChange={(event) => $value(ctx, parseFloat(event.currentTarget.value))}
      />
    </Field>
  );
}, 'NumberInput');
