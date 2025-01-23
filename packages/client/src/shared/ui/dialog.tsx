import {
  DialogActionTrigger,
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  IconButton,
  Portal,
} from '@chakra-ui/react';
import { reatomComponent } from '@reatom/npm-react';
import type { FormEvent, PropsWithChildren, ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

import { DisclosureAtom } from '@/shared/atoms/disclosure.atom.ts';
import { Button } from '@/shared/ui/button.tsx';

export type DialogProps = PropsWithChildren<{
  disclosure: DisclosureAtom;
  title: ReactNode;
  submitLabel?: ReactNode;
  cancelLabel?: ReactNode;
  onSubmit?: (event: FormEvent<HTMLElement>) => void;
  onClose?: () => void;
}>;

export const Dialog = reatomComponent<DialogProps>(
  ({
    ctx,
    disclosure,
    children,
    title,
    cancelLabel,
    submitLabel,
    onSubmit,
    onClose,
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
          size={'sm'}
          scrollBehavior={'outside'}
        >
          <DialogBackdrop />
          <DialogContent
            as={'form'}
            // @ts-expect-error noValidate is a valid form prop
            noValidate={true}
            onSubmit={(event) => {
              event.preventDefault();
              onSubmit?.(event);
            }}
          >
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
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
            </DialogHeader>
            <DialogBody>{children}</DialogBody>
            <DialogFooter>
              {cancelLabel && (
                <DialogActionTrigger asChild>
                  <Button variant="outline">cancelLabel</Button>
                </DialogActionTrigger>
              )}
              {submitLabel && <Button type={'submit'}>{submitLabel}</Button>}
            </DialogFooter>
          </DialogContent>
        </DialogRoot>
      </Portal>
    );
  },
);
