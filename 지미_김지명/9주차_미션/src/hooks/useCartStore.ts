import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);

          if (cartItem) {
            cartItem.amount += 1;
          }
        });
      },
      decrease: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);

          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1;
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * Number(item.price);
          });

          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

export const useCartInfo = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const amount = useCartStore((state) => state.amount);
  const total = useCartStore((state) => state.total);

  return { cartItems, amount, total };
};

// actions만 추출
export const useCartActions = (): CartActions =>
  useCartStore((state) => state.actions);
