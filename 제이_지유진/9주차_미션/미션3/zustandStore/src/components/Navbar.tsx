import { FaShoppingCart } from "react-icons/fa";
import { useCartStore } from "../stores/cartStore";

export default function Navbar() {
  const amount = useCartStore((state) => state.amount);

  return (
    <div className="flex fixed w-full justify-between items-center bg-gray-800 text-white p-4 z-1000">
      <h1 className="text-2xl font-bold">LP Store</h1>

      <div className="flex items-center space-x-2">
        <FaShoppingCart className="text-2xl" />
        <span className="text-xl">{amount}</span>
      </div>
    </div>
  );
}
