import { useEffect } from "react";
import { useCartStore } from "../stores/cartStore";
import CartTabs from "../components/CartTabs";
import CartFooter from "../components/CartFooter";
import Modal from "../components/Modal";

export default function HomePage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const calculateTotals = useCartStore((state) => state.calculateTotals);

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="mx-auto max-w-3xl p-6 pb-28 relative pt-30">
      <h1 className="text-3xl font-bold mb-6 text-center">장바구니</h1>

      <CartTabs />

      <div className="fixed bottom-0 left-0 right-0">
        <CartFooter />
      </div>

      <Modal />
    </div>
  );
}
