import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../../hooks/useCartStore";

export default function Header() {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <header className="w-full h-16 flex items-center justify-between px-6 bg-black">
      <div
        onClick={() => {
          window.location.href = "/";
        }}
        className="text-xl font-semibold text-white cursor-pointer"
      >
        UMC
      </div>

      <div className="flex items-center gap-2 text-2xl text-white">
        <ShoppingCart />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </header>
  );
}
