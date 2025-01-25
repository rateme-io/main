import { useEffect, useState } from 'react';

export const useCapsLock = () => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      setIsCapsLockOn(event.getModifierState('CapsLock'));
    };

    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyPress);
    };
  }, []);

  return {
    isCapsLockOn,
  };
};
