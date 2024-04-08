import { useCallback, useRef } from "react";

export const useDebounceFn = <Args extends unknown[]>(
  functionToDebounce: (...args: Args) => void,
  delay: number,
): ((...args: Args) => void) => {
  const timeoutRef = useRef<number | null>(null);

  const debouncedFunction = useCallback(
    (...args: Args) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        functionToDebounce(...args);
      }, delay);
    },
    [functionToDebounce, delay],
  );

  return debouncedFunction;
};

