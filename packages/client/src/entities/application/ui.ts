import { useAction, useAtom } from '@reatom/npm-react';
import { useEffect } from 'react';

import { applicationEffect, initApplicationAction } from './model.ts';

export const useApplicationController = () => {
  const initApplication = useAction(initApplicationAction);

  useAtom(applicationEffect);

  useEffect(() => {
    initApplication();
  }, [initApplication]);
};
