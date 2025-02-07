import { RouterProvider } from '@tanstack/react-router';
import { FunctionComponent } from 'react';

import {
  applicationEffect,
  initApplicationAction,
} from '@/entities/application';
import { reatomMemo } from '@/shared/ui/reatom-memo.ts';

import { router } from './router';
import { ctx } from './store.ts';

initApplicationAction(ctx);

export const App: FunctionComponent = reatomMemo(({ ctx }) => {
  ctx.spy(applicationEffect);
  return <RouterProvider router={router} />;
}, 'App');
