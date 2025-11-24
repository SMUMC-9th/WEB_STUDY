//1.저장소를 생성한다

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import modalReducer from "../features/modal/modalSlice";

function createStore() {
  const store = configureStore({
    //2.리듀서 설정
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });

  return store;
}

//store를 활용할 수 잇도록 내보내야 함.
//여기서 실행해서 스토어를 빼준다.
//싱글톤패턴
const store = createStore();

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


