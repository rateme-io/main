import { Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { reatomComponent } from '@reatom/npm-react';
import { useMemo } from 'react';
import { FaCheck } from 'react-icons/fa6';
import { FaXmark } from 'react-icons/fa6';

import { PasswordVo } from '@rateme/core/domain/value-objects/password.vo';

export type PasswordStrengthMeterProps = {
  password: string;
};

export const PasswordStrengthMeter =
  reatomComponent<PasswordStrengthMeterProps>(({ password }) => {
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
          if (!(check.type in checkLabels)) {
            throw new Error(`Unknown check type: ${check.type}`);
          }

          return (
            <Flex key={check.type} alignItems={'center'} gap={1}>
              {check.isValid ? (
                <Icon color={'green.500'}>
                  <FaCheck />
                </Icon>
              ) : (
                <Icon color={'red.500'}>
                  <FaXmark />
                </Icon>
              )}
              {Reflect.get(checkLabels, check.type)}
            </Flex>
          );
        })}
      </Stack>
    );
  }, 'PasswordStrengthMeter');

const checkLabels = {
  length: <Trans>At least 12 characters long</Trans>,
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
      <Trans>Not a common password</Trans>
      <Text as={'span'} color={'gray.400'} ml={1}>
        (12345, qwerty, password, etc.)
      </Text>
    </Text>
  ),
};
