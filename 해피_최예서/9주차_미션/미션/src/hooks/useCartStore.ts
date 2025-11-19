import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { CartItems } from "../types/cart";
import cartItems from "../constants/cartItems";

/// Step 1: 액션 타입 정의
/// 어떤 동작들을 수행할 수 있는지 정의함
interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

/// Step 2: 상태 타입(interface) 정의
/// store가 어떤 값을 가지는지, 어떤 액션을 제공하는지 정의함
interface CartState {
  // value
  cartItems: CartItems;
  amount: number;
  total: number;

  // action
  actions: CartActions;
}

/// Step 3: create() + immer()로 store 생성
/// - 초기 상태(cartItems, amount, total) 정의
/// - actions 안에 상태를 변경하는 함수들을 정의
/// - immer 미들웨어 덕분에 state를 직접 수정하는 문법 사용 가능
export const useCartStore = create<CartState>()(
  immer((set) => ({
    cartItems: cartItems, // 초기 장바구니 목록
    amount: 0, // 전체 상품 개수
    total: 0, // 전체 금액

    // Step 4: set으로 상태를 변경하는 액션들 정의
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

      // 특정 id의 상품을 장바구니에서 제거
      removeItem: (id: string) => {
        set((state) => {
          // 해당 id가 아닌 상품들만 남기고 필터링함
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },

      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },

      // Step 5: 파생 상태(amount, total) 계산
      // - amount: 전체 상품 개수 합
      // - total: 전체 금액 합
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          // 각 상품에 대해 개수와 가격을 합산함
          state.cartItems.forEach((item) => {
            amount += item.amount;
            total += item.amount * Number(item.price);
          });

          // 계산된 값을 상태에 반영함
          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

/// Step 6: 상태 전용 훅
/// - 컴포넌트에서 장바구니 상태(cartItems, amount, total)를 읽을 때 사용함
export const useCartInfo = () => {
  // Atomic selector 패턴: 각 값은 개별로 구독함
  const cartItems = useCartStore((state) => state.cartItems);
  const amount = useCartStore((state) => state.amount);
  const total = useCartStore((state) => state.total);

  return { cartItems, amount, total };
};

/// Step 7: 액션 전용 훅
/// - 컴포넌트에서 장바구니 관련 동작을 호출할 때 사용함
export const useCartActions = (): CartActions =>
  useCartStore((state) => state.actions);

/// 정리
/// - 상태(CartState)와 액션(CartActions)을 분리해서 정의함
/// - useCartInfo는 값만, useCartActions는 동작만 가져가도록 분리함
/// - actions 객체는 한 번만 정의되므로 함수 참조가 유지됨
///   컴포넌트는 항상 동일한 actions 객체를 바라보게 되어 리렌더에 유리함
/// - 테스트, 재사용성, 코드 가독성이 좋아짐
