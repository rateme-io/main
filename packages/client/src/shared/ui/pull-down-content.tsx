import { Box, BoxProps, IconButton } from '@chakra-ui/react';
import { Portal } from '@chakra-ui/react/portal';
import { FunctionComponent, PropsWithChildren, useState } from 'react';
import { FaCaretLeft, FaCaretRight } from 'react-icons/fa6';

export type PullDownContentProps = PropsWithChildren<{
  defaultIsOpened?: boolean;
  contentProps?: BoxProps;
}>;

export const PullDownContent: FunctionComponent<PullDownContentProps> = ({
  children,
  defaultIsOpened,
  contentProps,
}) => {
  const [isOpened, setIsOpened] = useState(defaultIsOpened ?? true);

  return (
    <Portal>
      <Box
        position={'absolute'}
        right={0}
        top={'60px'}
        bottom={0}
        width={'sm'}
        transition={'transform 0.3s'}
        transform={isOpened ? 'translateX(0)' : 'translateX(100%)'}
        boxShadow={'md'}
      >
        <Box
          width={'100%'}
          height={'100%'}
          backgroundColor={'white'}
          position={'relative'}
          zIndex={2}
          {...contentProps}
        >
          {children}
        </Box>

        <IconButton
          zIndex={1}
          size={'sm'}
          width={'24px'}
          justifyContent={'flex-start'}
          color={'black'}
          minWidth={'auto'}
          height={'auto'}
          position={'absolute'}
          left={'-18px'}
          top={4}
          backgroundColor={'white'}
          boxShadow={'md'}
          border={'1px solid gray.200'}
          onClick={() => setIsOpened(!isOpened)}
        >
          {isOpened ? <FaCaretRight /> : <FaCaretLeft />}
          fields
        </IconButton>
      </Box>
    </Portal>
  );
};
