import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import type { RootState } from "../app/store";

function Navbar() {
  const amount = useSelector((state: RootState) => state.cart.amount);

  return (
    <div className="flex fixed top-0 left-0 w-full justify-between items-center bg-gray-800 text-white p-4 shadow-md z-50">
      <h1 className="text-2xl font-bold">LP Store</h1>

      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl font-semibold">{amount}</span>
      </div>
    </div>
  );
}

export default Navbar;
