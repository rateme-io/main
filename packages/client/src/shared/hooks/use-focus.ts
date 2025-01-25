import { RefObject, useLayoutEffect, useState } from 'react';

export const useFocus = (ref: RefObject<HTMLInputElement | null>) => {
  const [isFocused, setIsFocused] = useState(false);

  useLayoutEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    const input = ref.current;

    if (input) {
      input.addEventListener('focus', onFocus);
      input.addEventListener('blur', onBlur);
    }

    return () => {
      if (input) {
        input.removeEventListener('focus', onFocus);
        input.removeEventListener('blur', onBlur);
      }
    };
  }, [ref]);

  return {
    isFocused,
  };
};
