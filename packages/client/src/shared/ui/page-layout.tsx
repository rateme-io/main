import { BoxProps } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { FunctionComponent } from 'react';

export const PageLayout: FunctionComponent<BoxProps> = (props) => {
  return (
    <Box
      {...props}
      width={'100%'}
      maxWidth={'8xl'}
      paddingInline={6}
      marginInline={'auto'}
    />
  );
};
