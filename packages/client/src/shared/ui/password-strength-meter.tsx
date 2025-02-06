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
        <Icon color={'green.500'}>
          <i>
            <FaCheck />
          </i>
        </Icon>
      ) : (
        <Icon color={'red.500'}>
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
  uppercase: <Trans>At least one uppercase letter</Trans>,
  lowercase: <Trans>At least one lowercase letter</Trans>,
  digit: <Trans>At least one digit</Trans>,
  special: (
    <Text>
      <Trans>At least one special character</Trans>
      <Text as={'span'} color={'gray.400'} ml={1}>
        (!@#$%^&*)
      </Text>
    </Text>
  ),
  consecutive: <Trans>No more than 2 consecutive characters</Trans>,
  common: (
    <Text>
      <Trans>Not a too simple password</Trans>
      <Text as={'span'} color={'gray.400'} ml={1}>
        (12345, qwerty, password, etc.)
      </Text>
    </Text>
  ),
};
