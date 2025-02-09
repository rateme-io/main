import { useEffect, useRef, useState } from 'react';

export const useDelayValue = <V>({
  value,
  timeouts,
}: {
  value: V;
  timeouts: number[];
}) => {
  const counterRef = useRef(0);
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    const counter = counterRef.current;

    counterRef.current = (counterRef.current + 1) % timeouts.length;

    const id = setTimeout(() => {
      setCurrentValue(value);
    }, timeouts[counter]);

    return () => clearTimeout(id);
  }, [value, timeouts]);

  return currentValue;
};
