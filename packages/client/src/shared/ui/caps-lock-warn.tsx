import { Text } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { FunctionComponent } from 'react';

import { useCapsLock } from '@/shared/hooks/use-caps-lock.ts';

export const CapsLockWarn: FunctionComponent = () => {
  const { isCapsLockOn } = useCapsLock();


  return <Text
    fontSize={'sm'}
    color={isCapsLockOn ? 'black' : 'gray.200'}
    fontWeight={'bold'}
  >
    <Trans>Caps Lock</Trans>
  </Text>
}