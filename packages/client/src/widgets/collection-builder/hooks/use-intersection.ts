import { useEvent } from '@khmilevoi/use-event';
import { RefObject, useLayoutEffect, useState } from 'react';

export const useIntersection = ({
  firstRef,
  secondRef,
}: {
  firstRef: RefObject<HTMLElement>;
  secondRef: RefObject<HTMLElement>;
}) => {
  const [intersection, setIntersection] = useState<number>(0);

  const calculateIntersection = useEvent(() => {
    if (!firstRef.current || !secondRef.current) {
      return;
    }

    const containerWidth = firstRef.current.clientWidth;
    const containerBoundingRect = firstRef.current.getBoundingClientRect();

    const menuBoundingRect = secondRef.current.getBoundingClientRect();

    setIntersection(
      containerWidth + containerBoundingRect.x - menuBoundingRect.x,
    );
  });

  useLayoutEffect(() => {
    const menuElement = secondRef.current;

    calculateIntersection();

    window.addEventListener('resize', calculateIntersection);

    const resizeObserver = new ResizeObserver(calculateIntersection);

    if (menuElement) {
      resizeObserver.observe(menuElement);
    }

    return () => {
      window.removeEventListener('resize', calculateIntersection);

      resizeObserver.disconnect();
    };
  }, [calculateIntersection, secondRef]);

  return {
    intersection,
  };
};
