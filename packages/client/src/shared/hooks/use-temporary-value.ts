import { useEffect, useState } from 'react';

export const useTemporaryValue = <V>({
  value,
  defaultValue,
  timeout,
}: {
  value: V;
  defaultValue: V;
  timeout: number;
}) => {
  const [currentValue, setCurrentValue] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => {
      setCurrentValue(defaultValue);
    }, timeout);

    return () => clearTimeout(id);
  }, [defaultValue, timeout]);

  return currentValue;
};
