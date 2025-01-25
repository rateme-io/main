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
import type { PropsWithChildren, ReactNode } from 'react';
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
  }) => {
    const isOpened = ctx.spy(disclosure.$isOpened);

    return (
      <Portal>
        <DialogRoot
          open={isOpened}
          onOpenChange={({ open }) => {
            if (!open) {
              onClose?.();
              disclosure.close(ctx);
            }
          }}
          size={size}
          scrollBehavior={'outside'}
        >
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
                {footer ? (
                  footer(formId)
                ) : (
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
                )}
              </DialogFooter>
            </DialogContent>
          </DialogPositioner>
        </DialogRoot>
      </Portal>
    );
  },
  'Dialog',
);
