// 이번 미션에서 쓰는 거 아니고 워크북 실습한 거 (지우기 뭐해서)

import { useState } from "react";

export default function useToggle(initialValue: boolean = false) {
  const [state, setState] = useState(initialValue);

  const toggle = () => setState((prev) => !prev);

  return [state, toggle] as const; // state, toggle 두 값을 배열로 묶어서 돌려줌.
  // as const 타입 단언을 사용해서 이 배열은 튜플이고 첫 번째는 boolean, 두 번째는 함수다 라고 확정시켜줌. 즉 나중에 const [state, toggle] = useToggle() 이렇게 구조 분해 할당했을 때 타입 보장해줌.
}
