import { Box, Text } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';

import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

type DefaultFieldRendererProps = PropsWithChildren<{
  title: ReactNode;
}>;

export const DefaultFieldRenderer = reatomMemo<DefaultFieldRendererProps>(
  ({ children, title }) => {
    return (
      <Box asChild>
        <tr>
          <Box asChild alignContent={'start'} padding={1}>
            <td>
              <Text fontWeight={'semibold'}>{title}</Text>
            </td>
          </Box>
          <Box asChild padding={1}>
            <td>{children}</td>
          </Box>
        </tr>
      </Box>
    );
  },
  'DefaultFieldRenderer',
);
