import { Kbd } from '@chakra-ui/react';
import { Trans } from '@lingui/react/macro';
import { LuSearch } from 'react-icons/lu';

import { Button } from '@/shared/ui/button.tsx';

export const BigSearch = () => {
  return (
    <Button
      variant={'outline'}
      maxWidth={'fit-content'}
      size={'sm'}
      justifyContent={'flex-start'}
      color={'gray.500'}
    >
      <LuSearch />
      <Trans>
        Type <Kbd>/</Kbd> to search
      </Trans>
    </Button>
  );
};
