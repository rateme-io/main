import { IconButton } from '@chakra-ui/react';
import { Box } from '@chakra-ui/react/box';
import { motion } from 'motion/react';
import { RefObject } from 'react';
import {
  TbLayoutSidebarLeftCollapseFilled,
  TbLayoutSidebarRightCollapseFilled,
} from 'react-icons/tb';

import { useCollectionBuilderContext } from '@/features/collection-builder/context.ts';
import { FieldBuilder } from '@/shared/field-builder/manager';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

export type MenuProps = {
  containerRef?: RefObject<HTMLElement | null>;
};

export const Menu = reatomMemo<MenuProps>(({ ctx, containerRef }) => {
  const { model } = useCollectionBuilderContext();

  const isOpened = ctx.spy(model.$menuIsOpened);
  const isHidden = ctx.spy(model.$menuIsHidden);

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
      pointerEvents={isHidden ? 'none' : 'all'}
    >
      <motion.div
        initial={{ right: 0, opacity: 1 }}
        animate={{ right: isOpened ? 0 : -300, opacity: isHidden ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box position={'absolute'} top={'44px'} left={'-22px'}>
          <IconButton
            variant={'ghost'}
            size={'2xs'}
            backgroundColor={'bg'}
            boxShadow={'sm'}
            onClick={() => model.$menuIsOpened.toggle(ctx)}
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
          <FieldBuilder.ui.Menu />
        </Box>
      </motion.div>
    </Box>
  );
}, 'Menu');
