import { useEffect, useRef, useState } from "react";

function useThrottle<T>(value: T, delay: number): T {
  const [throttle, setThrottle] = useState(value);

  // useRef 사용하면 컴포넌트가 리렌더링 되어도 값이 유지, 변경되어도 리렌더링 트리거 X
  const lastExecuted = useRef(Date.now());

  useEffect(() => {
    if (Date.now() >= lastExecuted.current + delay) {
      lastExecuted.current = Date.now();
      setThrottle(value);
    } else {
      const timerId = setTimeout(() => {
        lastExecuted.current = Date.now();
        setThrottle(value);
      }, delay);

      // CleanUp Function
      return () => clearTimeout(timerId);
    }
  }, [value, delay]);

  return throttle;
}

export default useThrottle;
