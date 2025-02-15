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

    const firstResizeObserver = new ResizeObserver(calculateIntersection);
    const firstMutationObserver = new MutationObserver(calculateIntersection);

    const secondResizeObserver = new ResizeObserver(calculateIntersection);
    const secondMutationObserver = new MutationObserver(calculateIntersection);

    if (firstElement) {
      firstResizeObserver.observe(firstElement);
      firstMutationObserver.observe(firstElement, {
        attributes: true,
        attributeFilter: ['style'],
      });
    }

    if (secondElement) {
      secondResizeObserver.observe(secondElement);
      secondMutationObserver.observe(secondElement, {
        attributes: true,
        attributeFilter: ['style'],
      });
    }

    return () => {
      firstResizeObserver.disconnect();
      firstMutationObserver.disconnect();

      secondResizeObserver.disconnect();
      secondMutationObserver.disconnect();
    };
  }, [calculateIntersection, firstRef, secondRef]);

  return {
    intersection,
  };
};
