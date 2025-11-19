import { useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);
  return (
    <div
      onClick={() => {
        window.location.href = "/";
      }}
      className="flex justify-between items-center p-4 bg-gray-800 text-white cursor-pointer"
    >
      <h1 className="text-2xl font-semibold">ddorri Park</h1>
      <div className="flex items-center gap-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
