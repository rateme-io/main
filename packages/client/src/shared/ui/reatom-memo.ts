import { PropsWithCtx, reatomComponent } from '@reatom/npm-react';
import { memo, ReactNode } from 'react';

export const reatomMemo = <T extends object>(
  Component: (props: PropsWithCtx<T>) => ReactNode,
  name?: string,
) =>
  memo(reatomComponent(Component, `${name}.reatomMemo`)) as (
    props: T extends PropsWithCtx<infer P> ? P : T,
  ) => ReactNode;
