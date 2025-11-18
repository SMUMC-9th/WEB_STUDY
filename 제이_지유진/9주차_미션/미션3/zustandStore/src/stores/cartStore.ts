import { create } from "zustand";
import cartItems from "../constants/CarItems";

export interface CartItem {
  id: string;
  title: string;
  singer: string;
  price: string;
  amount: number;
  img: string;
}

interface CartState {
  cartItems: CartItem[];
  amount: number;
  total: number;

  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: cartItems,
  amount: 0,
  total: 0,

  increase: (id) =>
    set((state) => ({
      cartItems: state.cartItems.map((item) =>
        item.id === id ? { ...item, amount: item.amount + 1 } : item
      ),
    })),

  decrease: (id) =>
    set((state) => ({
      cartItems: state.cartItems
        .map((item) =>
          item.id === id ? { ...item, amount: item.amount - 1 } : item
        )
        .filter((item) => item.amount > 0),
    })),

  removeItem: (id) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.id !== id),
    })),

  clearCart: () =>
    set({
      cartItems: [],
      amount: 0,
      total: 0,
    }),

  calculateTotals: () => {
    const { cartItems } = get();
    let amount = 0;
    let total = 0;

    cartItems.forEach((item) => {
      amount += item.amount;
      total += parseInt(item.price) * item.amount;
    });

    set({ amount, total });
  },
}));
