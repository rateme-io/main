import { Box, Input, Stack } from '@chakra-ui/react';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { FunctionComponent, useEffect } from 'react';

import { Button } from '@/shared/ui/button';
import {
  DialogBackdrop,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from '@/shared/ui/dialog';
import { Field } from '@/shared/ui/field';
import {
  PasswordInput,
  PasswordStrengthMeter,
} from '@/shared/ui/password-input';

import {
  $email,
  $password,
  $passwordComplexity,
  reset,
  submit,
} from './model.ts';

export type LoginDialogProps = {
  isOpened: boolean;
  onClose: () => void;
};

export const LoginDialog = reatomComponent<LoginDialogProps>(
  ({ isOpened, onClose, ctx }) => {
    useEffect(() => () => reset(ctx), [ctx]);

    return (
      <DialogRoot
        open={isOpened}
        onOpenChange={({ open }) => {
          if (!open) {
            onClose();
          }
        }}
      >
        <DialogBackdrop />
        <DialogTrigger />
        <DialogContent
          as={'form'}
          maxWidth={'300px'}
          portalled
          onSubmit={(event) => {
            event.preventDefault();

            submit(ctx);
          }}
        >
          <DialogCloseTrigger />
          <DialogHeader>
            <DialogTitle>
              <Trans>Sign in</Trans>
            </DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Box display={'flex'} flexDirection={'column'} gap={5}>
              <EmailField />

              <PasswordField />
            </Box>
          </DialogBody>
          <DialogFooter>
            <Button type={'submit'}>
              <Trans>Sign in</Trans>
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    );
  },
);

const EmailField: FunctionComponent = reatomComponent(({ ctx }) => {
  return (
    <Field label={t`Email`} required>
      <Input
        type={'email'}
        placeholder={t`Enter your email`}
        value={ctx.spy($email)}
        onChange={(e) => {
          $email(ctx, e.currentTarget.value);
        }}
      />
    </Field>
  );
});

const PasswordField: FunctionComponent = reatomComponent(({ ctx }) => {
  const complexity = ctx.spy($passwordComplexity);

  return (
    <Field
      label={t`Password`}
      helperText={
        <Box as={'ul'}>
          {complexity.errors.map((error) => (
            <li key={error}>- {error}</li>
          ))}
        </Box>
      }
      required
    >
      <Stack width={'100%'}>
        <PasswordInput
          placeholder={t`Enter your password`}
          value={ctx.spy($password)}
          onChange={(event) => $password(ctx, event.currentTarget.value)}
        />
        <PasswordStrengthMeter value={complexity.level} />
      </Stack>
    </Field>
  );
});
