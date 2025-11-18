import type {CartItems} from "../types/cart.ts";
import cartItems from "../constants/cartItems.ts";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

// initialState라는 변수는 CartState라는 타입 구조를 따라야 한다.
const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

// cartSlice 생성
// createSlice - reduxToolkit에서 제공
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 증가
    increase: (state, action: PayloadAction<{id: string}>) => {
      const itemId = action.payload.id; // 어떤 상품을 증가시킬지 id 받음

      // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
      // cartItems 배열에서 해당 id 상품 찾음 (find: 배열에서 조건에 맞는 첫 번째 요소를 찾아서 반환)
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount += 1;
      }
    },

    // 감소
    decrease: (state, action: PayloadAction<{id: string}>) => {
      const itemId = action.payload.id; // 어떤 상품을 증가시킬지 id 받음

      // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
      // cartItems 배열에서 해당 id 상품 찾음 (find: 배열에서 조건에 맞는 첫 번째 요소를 찾아서 반환)
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount -= 1;
      }
    },

    // removeItem
    removeItem: (state, action: PayloadAction<{id: string}>) => {
      // action.payload.id : = dispatch로 넘긴 id 값을 꺼내서 itemId라는 변수에 넣는 것.
      const itemId = action.payload.id;

      // filter: 조건에 맞는 여소들만 골라서 새로운 배열을 남김(-누른 lp의 id 빼고 다 남기기)
      state.cartItems = state.cartItems.filter((cartItem) => cartItem.id !== itemId);

    },

    // ClearCart
    clearCart: (state) => {
      state.cartItems = [];
    },

    // 총액 계산
    calculateTotlas: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * item.price;
      })

      state.amount = amount;
      state.total = total;
    }
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotlas} = cartSlice.actions;

// dudck pattern reducer는 export default로 내보내야 함
const cartReducer = cartSlice.reducer;

export default cartReducer;