import { ComponentType, FunctionComponent } from 'react';

import {
  lazyWithPreload,
  PreloadableComponent,
} from '@/shared/ui/lazy-with-preload.ts';

/**
 * Utility to create a lazy component switcher.
 *
 * @param mapping - Object where keys are identifiers and values are dynamic import functions
 * that return a Promise resolving to a component.
 * @param defaultKey - Identifier of the component that should be preloaded immediately.
 * @returns A React component that accepts an `id` prop to switch between lazy-loaded components.
 */
export const createLazySwitch = <
  T extends Record<string, () => Promise<{ default: ComponentType<object> }>>,
>(
  mapping: T,
  defaultKey?: keyof T,
): FunctionComponent<{ id: keyof T }> => {
  const lazyComponents: Record<
    keyof T,
    PreloadableComponent<ComponentType<object>>
  > = Object.entries(mapping).reduce((result, [key, value]) => {
    result[key as keyof T] = lazyWithPreload(value);

    return result;
  }, {});

  if (defaultKey) {
    lazyComponents[defaultKey].preload();
  }

  return function LazySwitch({ id }: { id: keyof T }) {
    const Component = lazyComponents[id];

    return <Component />;
  };
};