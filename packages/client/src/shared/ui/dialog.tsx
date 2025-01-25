import { IconButton } from '@chakra-ui/react';
import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogPositioner,
  DialogRoot,
  DialogTitle,
} from '@chakra-ui/react/dialog';
import { Portal } from '@chakra-ui/react/portal';
import { reatomComponent } from '@reatom/npm-react';
import type { FunctionComponent, PropsWithChildren, ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

import { DisclosureAtom } from '@/shared/atoms/disclosure.atom.ts';
import { Button } from '@/shared/ui/button.tsx';

export type DialogProps = PropsWithChildren<{
  disclosure: DisclosureAtom;
  title: ReactNode;
  submitLabel?: ReactNode;
  cancelLabel?: ReactNode;
  onClose?: () => void;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'cover' | 'full';
  isLoading?: boolean;
  formId?: string;
  initialFocusEl?: () => HTMLElement | null;
  footer?: (formId?: string) => ReactNode;
}>;

export const Dialog = reatomComponent<DialogProps>(
  ({
    ctx,
    disclosure,
    children,
    title,
    cancelLabel,
    submitLabel,
    onClose,
    size,
    isLoading,
    formId,
    footer,
    initialFocusEl,
  }) => {
    const isOpened = ctx.spy(disclosure.$isOpened);

    return (
      <DialogRoot
        open={isOpened}
        onOpenChange={({ open }) => {
          if (!open) {
            onClose?.();
            disclosure.close(ctx);
          }
        }}
        initialFocusEl={initialFocusEl}
        size={size}
        scrollBehavior={'outside'}
      >
        <Portal>
          <DialogBackdrop />
          <DialogPositioner>
            <DialogContent>
              <DialogCloseTrigger asChild>
                <IconButton
                  variant={'ghost'}
                  position={'absolute'}
                  top={2}
                  right={2}
                >
                  <IoClose />
                </IconButton>
              </DialogCloseTrigger>
              <DialogHeader as={'header'}>
                <DialogTitle>{title}</DialogTitle>
              </DialogHeader>
              <DialogBody as={'main'}>{children}</DialogBody>
              <DialogFooter as={'footer'}>
                <Footer
                  footer={footer}
                  cancelLabel={cancelLabel}
                  submitLabel={submitLabel}
                  isLoading={isLoading}
                  formId={formId}
                />
              </DialogFooter>
            </DialogContent>
          </DialogPositioner>
        </Portal>
      </DialogRoot>
    );
  },
  'Dialog',
);

const Footer: FunctionComponent<{
  footer: DialogProps['footer'];
  cancelLabel: DialogProps['cancelLabel'];
  submitLabel: DialogProps['submitLabel'];
  isLoading: DialogProps['isLoading'];
  formId: DialogProps['formId'];
}> = ({ cancelLabel, submitLabel, footer, formId, isLoading }) => {
  if (footer) {
    return footer(formId);
  }

  return (
    <>
      {cancelLabel && (
        <DialogActionTrigger asChild>
          <Button variant="outline">cancelLabel</Button>
        </DialogActionTrigger>
      )}
      {submitLabel && (
        <Button form={formId} type={'submit'} loading={isLoading}>
          {submitLabel}
        </Button>
      )}
    </>
  );
};
