import { useState } from 'react';

export const useActive = <T>(initialValue: T): [T, (newValue: T) => void] => {
  const [activeItem, setActive] = useState<T>(initialValue);
  return [activeItem, setActive];
};
