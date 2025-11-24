import { ShoppingCart } from "lucide-react";
import { useEffect } from "react";
import { useCartActions, useCartInfo } from "../hooks/useCartStore";

const Navbar = () => {
  const { amount, cartItems } = useCartInfo();
  const { totalPrice } = useCartActions();

  useEffect(() => {
    totalPrice();
  }, [totalPrice, cartItems]);

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="flex justify-between items-center px-6 py-4 max-w-5xl mx-auto">
        <h1
          onClick={() => {
            window.location.href = "/";
          }}
          className="text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-500 to-blue-500 bg-clip-text text-transparent cursor-pointer"
        >
          PlayList
        </h1>

        <div className="relative group">
          <button className="flex items-center gap-2 p-2 rounded-lg group-hover:bg-gray-100">
            <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-indigo-500 transition" />
          </button>
          <span className="absolute -top-2 -right-3 bg-indigo-300 text-white text-xs px-2 py-0.5 rounded-full">
            {amount}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
