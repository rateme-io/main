import { Box, Fieldset } from '@chakra-ui/react';
import { PropsWithCtx } from '@reatom/npm-react';
import { ReactNode, useId } from 'react';

import { BaseForm, FormAtom } from '@/shared/atoms/form.atom.ts';
import { Dialog, DialogProps } from '@/shared/ui/dialog';
import { Form } from '@/shared/ui/form.tsx';

import { reatomMemo } from './reatom-memo';

export type AsyncFormDialogProps<Form extends BaseForm> = {
  form: FormAtom<Form>;
  onSubmit?: () => void;
  errorRenderer?: (error: string) => ReactNode;
  afterError?: ReactNode;
} & Omit<DialogProps, 'formId' | 'isLoading'>;

export const AsyncFormDialog = reatomMemo(
  <Form extends BaseForm>({
    disclosure,
    ctx,
    form,
    children,
    onClose,
    onSubmit,
    errorRenderer,
    afterError,
    ...props
  }: PropsWithCtx<AsyncFormDialogProps<Form>>) => {
    const formId = useId();

    return (
      <Dialog
        {...props}
        disclosure={disclosure}
        onClose={() => {
          form.reset(ctx);
          onClose?.();
        }}
        isLoading={ctx.spy(form.$isLoading)}
        formId={formId}
      >
        <Form
          as={'form'}
          id={formId}
          flexDirection={'column'}
          noValidate
          gap={4}
          onSubmit={async (event) => {
            event.preventDefault();

            onSubmit?.();

            const isSubmitted = await form.submit(ctx);

            if (isSubmitted) {
              disclosure.close(ctx);
              form.reset(ctx);
            }
          }}
        >
          <Fieldset.Root
            disabled={ctx.spy(form.$isLoading)}
            invalid={!!ctx.spy(form.$formError)}
          >
            {children}

            {errorRenderer && (
              <Box height={'1em'}>
                <ErrorRenderer form={form} errorRenderer={errorRenderer} />
              </Box>
            )}

            {afterError}
          </Fieldset.Root>
        </Form>
      </Dialog>
    );
  },
  'AsyncFormDialog',
);

const ErrorRenderer = reatomMemo<{
  errorRenderer: (error: string) => ReactNode;
  form: FormAtom<BaseForm>;
}>(({ ctx, form, errorRenderer }) => {
  const error = ctx.spy(form.$formError);

  if (error === null) {
    return null;
  }

  return <Fieldset.ErrorText>{errorRenderer(error)}</Fieldset.ErrorText>;
}, 'ErrorRenderer');
