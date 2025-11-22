import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 1) 증가
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const item = state.cartItems.find((i) => i.id === action.payload.id);
      if (item) {
        item.amount += 1;
      }
    },

    // 2) 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      // 이 아이디를 통해서, 전체 음반 중에 내가 클릭한 음반을 찾기
      const item = state.cartItems.find((item): boolean => item.id === itemId);

      if (item) {
        item.amount -= 1;
      }
    },

    // 3) removeItem 아이템 제거
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    // 4) clearCart 장바구니 비우기
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    // 5) 총액 계산
    calculateTotals: (state) => {
      let total = 0;
      let amount = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * Number(item.price);
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
