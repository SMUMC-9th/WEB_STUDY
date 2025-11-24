//1. 저장소를 생성한다.
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import { modalSlice } from "../slices/modalSlice";

function createStore() {
  const store = configureStore({
    //2. 리듀서 설정
    reducer: {
      cart: cartReducer,
      modal: modalSlice.reducer,
    },
  });
  return store;
}

// store를 활용할 수 있도록 내보내야 한다.
// 여기서 실행해서 스토어를 빼준다.
// Singleton 패턴
const store = createStore();

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
