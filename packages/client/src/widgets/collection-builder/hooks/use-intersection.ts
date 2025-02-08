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
      Math.max(
        containerWidth + containerBoundingRect.x - menuBoundingRect.x,
        0,
      ),
    );
  });

  useLayoutEffect(() => {
    const firstElement = firstRef.current;
    const secondElement = secondRef.current;

    calculateIntersection();

    window.addEventListener('resize', calculateIntersection);

    const firstResizeObserver = new ResizeObserver(calculateIntersection);
    const secondResizeObserver = new ResizeObserver(calculateIntersection);

    if (firstElement) {
      firstResizeObserver.observe(firstElement);
    }

    if (secondElement) {
      secondResizeObserver.observe(secondElement);
    }

    return () => {
      window.removeEventListener('resize', calculateIntersection);

      firstResizeObserver.disconnect();
      secondResizeObserver.disconnect();
    };
  }, [calculateIntersection, firstRef, secondRef]);

  return {
    intersection,
  };
};
