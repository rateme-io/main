import {
  useEffect,
  FunctionComponent,
  ComponentType,
  LazyExoticComponent,
} from 'react';

/**
 * Utility to create a lazy component switcher.
 *
 * `mapping` - object where keys are identifiers and values are lazy-loaded
 * components created via `React.lazy`.
 * `defaultKey` - identifier of the component that should be preloaded.
 */
export const createLazySwitch = <
  P = Record<string, never>,
  T extends Record<string, LazyExoticComponent<ComponentType<P>>> = Record<
    string,
    LazyExoticComponent<ComponentType<P>>
  >,
>(mapping: T): FunctionComponent<{ id: keyof T; defaultKey: keyof T } & P> => {

  return function LazySwitch({ id, defaultKey, ...rest }: { id: keyof T; defaultKey: keyof T } & P) {
    useEffect(() => {
      (mapping[defaultKey] as any)?.preload?.();
    }, [defaultKey]);

    const Component = mapping[id];

    return <Component {...(rest as any)} />;
  };
};
