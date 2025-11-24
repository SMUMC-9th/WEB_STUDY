import { useEffect, useState } from "react";

// 입력값 변화가 멈췄을 때만 일정 시간 후 값 업데이트함
function useDebounce<T>(value: T, delay: number) {
  // 디바운스된 값을 저장할 상태
  const [debounceValue, setDebounceValue] = useState<T>(value);

  useEffect(() => {
    // delay 시간 후에 value를 debounceValue로 반영
    const handler = setTimeout(() => setDebounceValue(value), delay);

    // value가 바뀌면 기존 타이머 취소함
    return () => clearTimeout(handler);
  }, [value, delay]);

  // 디바운스된 값 반환
  return debounceValue;
}

// 훅을 외부에서 사용할 수 있게 내보냄
export default useDebounce;
