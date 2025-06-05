import { ComponentType, createElement, forwardRef, lazy, useRef } from 'react';

export type PreloadableComponent<T extends ComponentType<object>> = T & {
  preload: () => Promise<T>;
};

export const lazyWithPreload = <T extends ComponentType<object>>(
  factory: () => Promise<{ default: T }>,
): PreloadableComponent<T> => {
  const ReactLazyComponent = lazy(factory);
  let PreloadedComponent: T | undefined;
  let factoryPromise: Promise<T> | undefined;

  const Component = forwardRef(function LazyWithPreload(props, ref) {
    // Once one of these is chosen, we must ensure that it continues to be
    // used for all subsequent renders, otherwise it can cause the
    // underlying component to be unmounted and remounted.
    const ComponentToRender = useRef(PreloadedComponent ?? ReactLazyComponent);
    return createElement(
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      // eslint-disable-next-line react-compiler/react-compiler
      ComponentToRender.current,
      // eslint-disable-next-line react-compiler/react-compiler
      Object.assign(ref ? { ref } : {}, props) as object,
    );
  });

  const LazyWithPreload = Component as unknown as PreloadableComponent<T>;

  LazyWithPreload.preload = () => {
    if (!factoryPromise) {
      factoryPromise = factory().then((module) => {
        PreloadedComponent = module.default;
        return PreloadedComponent;
      });
    }

    return factoryPromise;
  };

  return LazyWithPreload;
};