import { useEffect, useState } from "react";

export const useDebounce = (value: string, sec: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, sec * 1000);

    return () => clearTimeout(timer);
  }, [value]);

  return debouncedValue;
};
