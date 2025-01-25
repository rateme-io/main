import { RefObject, useLayoutEffect, useState } from 'react';

export const useFocus = (ref: RefObject<HTMLInputElement | null>) => {
  const [isFocused, setIsFocused] = useState(false);

  useLayoutEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);

    if (ref.current) {
      ref.current.addEventListener('focus', onFocus);
      ref.current.addEventListener('blur', onBlur);
    }

    return () => {
      if (ref.current) {
        ref.current.removeEventListener('focus', onFocus);
        ref.current.removeEventListener('blur', onBlur);
      }
    };
  }, [ref]);

  return {
    isFocused,
  };
};
