import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";

export interface CarState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CarState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

//CartSlice 생성
//createSlice -> reduxToolKit에서 제공해준다.
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // 증가
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount += 1;
      }
    },

    // 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);

      if (item) {
        item.amount -= 1;
      }
    },
    // removeItem
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
    },

    // clearCart
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    // 총액 계산
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
