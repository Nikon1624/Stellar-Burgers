import { useState, useEffect } from 'react';

export const useActive = <T>(initialValue: T): [T, (newValue: T) => void] => {
  const [activeItem, setActive] = useState<T>(initialValue);

  useEffect(() => {
    setActive(initialValue);
  }, [initialValue]);

  return [activeItem, setActive];
};
