import { Box, Input } from '@chakra-ui/react';
import { useRef } from 'react';
import { LuSearch } from 'react-icons/lu';

import { useFocus } from '@/shared/hooks/use-focus.ts';
import { InputGroup } from '@/shared/ui/input-group.tsx';

export const BigSearch = () => {
  const ref = useRef<HTMLInputElement | null>(null);

  const { isFocused } = useFocus(ref);

  return (
    <Box width={'100%'} flex={1}>
      <Box
        position={'absolute'}
        top={0}
        left={0}
        right={0}
        bottom={0}
        backgroundColor={'blackAlpha.400'}
        zIndex={isFocused ? 999999 : undefined}
        opacity={isFocused ? 1 : 0}
        display={isFocused ? 'block' : 'none'}
      />
      <InputGroup
        startElement={<LuSearch />}
        zIndex={isFocused ? 1000000 : undefined}
        backgroundColor={'white'}
        borderRadius={'lg'}
        width={'100%'}
      >
        <Input
          zIndex={isFocused ? 1000000 : undefined}
          borderRadius={'lg'}
          ref={ref}
        />
      </InputGroup>
    </Box>
  );
};
