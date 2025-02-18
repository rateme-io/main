import { Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { useMemo } from 'react';
import { FaCheck, FaXmark } from 'react-icons/fa6';

import { PasswordVo } from '@rateme/core/domain/value-objects/password.vo';

import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

export type PasswordStrengthMeterProps = {
  password: string;
};

export const PasswordStrengthMeter = reatomMemo<PasswordStrengthMeterProps>(
  ({ password }) => {
    const validation = useMemo(() => {
      return PasswordVo.checks.map((check) => {
        return {
          type: check.type,
          isValid: check.schema.safeParse(password).success,
        };
      });
    }, [password]);

    return (
      <Stack>
        {validation.map((check) => {
          return (
            <CheckItem
              key={check.type}
              type={check.type}
              isValid={check.isValid}
            />
          );
        })}
      </Stack>
    );
  },
  'PasswordStrengthMeter',
);

type CheckItemProps = {
  type: string;
  isValid: boolean;
};

const CheckItem = reatomMemo<CheckItemProps>(({ type, isValid }) => {
  if (!(type in checkLabels)) {
    throw new Error(`Unknown check type: ${type}`);
  }

  return (
    <Flex key={type} alignItems={'center'} gap={1}>
      {isValid ? (
        <Icon color={'fg.success'}>
          <i>
            <FaCheck />
          </i>
        </Icon>
      ) : (
        <Icon color={'fg.error'}>
          <i>
            <FaXmark />
          </i>
        </Icon>
      )}
      {Reflect.get(checkLabels, type)}
    </Flex>
  );
}, 'CheckItem');

const checkLabels = {
  length: <Trans>At least 12 characters long</Trans>,
  'no-white-space': <Trans>No white spaces</Trans>,
  uppercase: <Trans>Must include at least one uppercase letter</Trans>,
  lowercase: <Trans>Must include at least one lowercase letter</Trans>,
  digit: <Trans>Must contain at least one digit</Trans>,
  special: (
    <Text>
      <Trans>Must include at least one special character</Trans>
      <Text as={'span'} color={'fg.subtle'} ml={1}>
        (!@#$%^&*)
      </Text>
    </Text>
  ),
  consecutive: <Trans>No more than 2 consecutive characters</Trans>,
  common: (
    <Text>
      <Trans>Not a too simple password</Trans>
      <Text as={'span'} color={'fg.subtle'} ml={1}>
        (12345, qwerty, password, etc.)
      </Text>
    </Text>
  ),
};
