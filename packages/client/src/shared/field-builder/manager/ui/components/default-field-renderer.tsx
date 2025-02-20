import { Text } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { Flex } from '@chakra-ui/react/flex';
import { ReactNode } from 'react';

import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

type DefaultFieldRendererProps = {
  title: ReactNode;
  value: ReactNode;
};

export const DefaultFieldRenderer = reatomMemo<DefaultFieldRendererProps>(
  ({ value, title }) => {
    return (
      <Flex>
        <Text fontWeight={'bold'}>{title}</Text>
        <Box>{value}</Box>
      </Flex>
    );
  },
  'DefaultFieldRenderer',
);
