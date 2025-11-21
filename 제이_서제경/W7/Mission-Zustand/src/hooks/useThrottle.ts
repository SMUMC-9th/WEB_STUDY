import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, delay = 500) {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();

    if (now >= lastExecuted.current + delay) {
      lastExecuted.current = now;
      setThrottledValue(value);
    } else {
      const timeId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottledValue(value);
      }, delay);

      return () => clearTimeout(timeId);
    }
  }, [value, delay]);

  return throttledValue;
}
