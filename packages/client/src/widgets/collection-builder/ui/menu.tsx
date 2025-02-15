import { IconButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { motion } from 'motion/react';
import { RefObject, useState } from 'react';
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from 'react-icons/tb';

import { reatomMemo } from '@/shared/ui/reatom-memo';
import { CollectionFields } from '@/widgets/collection-builder/fields';

export type MenuProps = {
  containerRef?: RefObject<HTMLElement | null>;
};

export const Menu = reatomMemo<MenuProps>(({ containerRef }) => {
  const [isOpened, setIsOpened] = useState(true);

  return (
    <Box
      asChild
      ref={containerRef}
      width={'300px'}
      position={'absolute'}
      top={0}
      right={0}
      bottom={0}
      boxShadow={'sm'}
    >
      <motion.div
        initial={{ right: 0 }}
        animate={{ right: isOpened ? 0 : -300 }}
        transition={{ duration: 0.3 }}
      >
        <Box position={'absolute'} top={'16px'} left={'-22px'}>
          <IconButton
            variant={'ghost'}
            size={'2xs'}
            backgroundColor={'bg'}
            boxShadow={'sm'}
            onClick={() => setIsOpened(!isOpened)}
            borderRightRadius={'none'}
          >
            {isOpened ? (
              <TbLayoutSidebarRightCollapseFilled />
            ) : (
              <TbLayoutSidebarLeftCollapseFilled />
            )}
          </IconButton>
        </Box>

        <Box
          overflowY={'auto'}
          position={'absolute'}
          width={'100%'}
          height={'100%'}
        >
          <CollectionFields.Menu />
        </Box>
      </motion.div>
    </Box>
  );
}, 'Menu');
