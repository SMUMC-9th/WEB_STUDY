import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { calculateTotals } from "../features/cart/cartSlice";
import CartTabs from "../component/CartTabs";
import CartFooter from "../component/CartFooter";
import Modal from "../component/Modal";

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="mx-auto max-w-3xl p-6 pb-28 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center">장바구니</h1>

      <CartTabs />

      <div className="fixed bottom-0 left-0 right-0">
        <CartFooter />
      </div>

      <Modal />
    </div>
  );
}
