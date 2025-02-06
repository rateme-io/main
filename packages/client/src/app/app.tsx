import { FunctionComponent } from 'react';

import { ctx } from '@/app/store.ts';
import {
  applicationEffect,
  initApplicationAction,
} from '@/entities/application';

import { Provider } from './provider';

initApplicationAction(ctx);
ctx.get(applicationEffect);

export const App: FunctionComponent = () => {
  return <Provider />;
};
