import { ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "../../hooks/useCustomRedux";
import { useEffect } from "react";
import { calculateTotals } from "../../slices/cartSlice";

export default function Header() {
  const { amount, cartItems } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [dispatch, cartItems]);

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
