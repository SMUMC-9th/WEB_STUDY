import { useEffect, useRef, useState } from "react";

export function useThrottle<T>(value: T, interval: number): T {
  const [throttledValue, setThrottledValue] = useState(value);
  const lastExecuted = useRef<number>(Date.now());

  useEffect(() => {
    const now = Date.now();
    const remaining = interval - (now - lastExecuted.current);

    if (remaining <= 0) {
      setThrottledValue(value);
      lastExecuted.current = now;
    } else {
      const timer = setTimeout(() => {
        setThrottledValue(value);
        lastExecuted.current = Date.now();
      }, remaining);

      return () => clearTimeout(timer);
    }
  }, [value, interval]);

  return throttledValue;
}
