import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../../constants/CarItems";

interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  img: string;
  amount: number;
}

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
      state.amount = 0;
      state.total = 0;
    },

    removeItem: (state, action: PayloadAction<string>) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.id !== action.payload
      );
    },

    increase: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (item) {
        item.amount += 1;
      }
    },

    decrease: (state, action: PayloadAction<string>) => {
      const item = state.cartItems.find((i) => i.id === action.payload);
      if (!item) return;

      item.amount -= 1;

      if (item.amount < 1) {
        state.cartItems = state.cartItems.filter(
          (i) => i.id !== action.payload
        );
      }
    },

    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.amount * Number(item.price);
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { clearCart, removeItem, increase, decrease, calculateTotals } =
  cartSlice.actions;

export default cartSlice.reducer;
