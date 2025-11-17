import { useEffect, useState } from "react";

//value값이 string일수도있고, 배열, null일수도있기때문에 제너릭으로 받아오기위해서 T.
function useDebounce<T>(value: T, delay: number) {
  //setDebouncedValue를 통해 몇초후에 devouncedvalue값을 바꿔줘야겠지
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  //value, delay가 변경될때마다 실행
  useEffect(() => {
    //delay (ms)후에 실행한다.
    //delay 시간 후에 value를 debouncedValue로 업데이트하는 타이머를 시작합니다.
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    //value가 변경되면, 기존의 타이머를 지워서 업데이트를 취소한다.
    //값이 계속 바뀔때마다 마지막에 멈춘 값만 업데이트 됩니다.
    return () => clearTimeout(handler);
  }, [value, delay]);

  //최종적으로 잠시 기다린 후의 값을 반환합니다.
  return debouncedValue;
}

export default useDebounce;
