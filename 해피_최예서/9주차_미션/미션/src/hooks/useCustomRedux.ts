// react-redux 기본 훅을 다른 이름으로 import함
import {
  useDispatch as useDefaultDispatch,
  useSelector as useDefaultSelector,
} from "react-redux";

import type { TypedUseSelectorHook } from "react-redux";
import type { AppDispatch, RootState } from "../store/store.ts";

// 타입이 반영된 dispatch 훅을 만들기 위한 재정의임
// 컴포넌트에서 사용 시 타입을 명확하게 보장함
export const useDispatch: () => AppDispatch = useDefaultDispatch;

// state 선택 시 RootState 기반으로 타입이 적용됨
// 컴포넌트에서 state를 조회할 때 타입 안정성을 높여줌
export const useSelector: TypedUseSelectorHook<RootState> = useDefaultSelector;
