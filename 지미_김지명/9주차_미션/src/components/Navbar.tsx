import { FaShoppingCart } from "react-icons/fa";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const cartItems = useCartInfo();
  const { calculateTotals } = useCartActions();

  useEffect(() => {
    calculateTotals();
  }, [cartItems, calculateTotals]);

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1
        onClick={() => {
          window.location.href = "/";
        }}
        className="text-2xl font-semibold cursor-pointer"
      >
        김지명
      </h1>
      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-medium">{cartItems.amount}</span>
      </div>
    </div>
  );
};

export default Navbar;
