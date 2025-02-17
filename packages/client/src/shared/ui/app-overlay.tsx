import { AnimatePresence, motion } from 'motion/react';

import { $application } from '@/entities/application';
import { BigLogo } from '@/shared/ui/logo';

import { reatomMemo } from './reatom-memo';

export const AppOverlay = reatomMemo(({ ctx }) => {
  const application = ctx.spy($application);

  return (
    <AnimatePresence>
      {application.status === 'initializing' && <AppLoader />}
    </AnimatePresence>
  );
}, 'AppOverlay');

export const AppLoader = reatomMemo(() => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 4,
        zIndex: 1000,
        backgroundColor: 'var(--chakra-colors-bg)',
      }}
    >
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          repeat: Infinity,
          repeatType: 'loop',
          duration: 1.5,
          ease: 'easeInOut',
        }}
      >
        <BigLogo maxHeight={'50px'} />
      </motion.div>
    </motion.div>
  );
}, 'AppLoader');
