// 1. 저장소 생성
import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice.ts";
import modalReducer from "../slices/modalSlice.ts";

function createStore() {
  const store = configureStore({
    // 2. 리듀서 설정
    reducer: {
      cart: cartReducer, // cart 슬라이스
      modal: modalReducer, // modal 슬라이스 추가
    },
    });
  return store;
}

// store를 활용할 수 있도록 export 해야 함
// 여기서 싷랭해서 스토어를 빼준다.
// 싱글톤패턴
const store = createStore();

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch


