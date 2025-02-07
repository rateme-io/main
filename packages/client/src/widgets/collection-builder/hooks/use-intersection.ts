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
    const firstElement = firstRef.current;
    const secondElement = secondRef.current;

    calculateIntersection();

    window.addEventListener('resize', calculateIntersection);

    const resizeObserver = new ResizeObserver(calculateIntersection);

    if (firstElement) {
      resizeObserver.observe(firstElement);
    }

    if (secondElement) {
      resizeObserver.observe(secondElement);
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
