import { PropsWithCtx, reatomComponent } from '@reatom/npm-react';
import { memo, MemoExoticComponent, ReactNode } from 'react';

export const reatomMemo = <T extends object>(
  Component: (props: PropsWithCtx<T>) => ReactNode,
  name?: string,
): MemoExoticComponent<
  (props: T extends PropsWithCtx<infer P> ? P : T) => ReactNode
> => memo(reatomComponent(Component, `${name}.reatomMemo`));
