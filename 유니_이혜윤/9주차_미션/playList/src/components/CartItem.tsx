import { useCartActions } from "../hooks/useCartStore";
import type { Lp } from "../types/cart";
import { CircleMinus, CirclePlus } from "lucide-react";

interface CartItemProps {
  lp: Lp;
}

const CartItem = ({ lp }: CartItemProps) => {
  const { increase, decrease, removeItem } = useCartActions();

  const handleIncreaseCount = () => {
    increase(lp.id);
  };

  const handleDecreaseCount = () => {
    if (lp.amount === 1) {
      removeItem(lp.id);
      return;
    }
    decrease(lp.id);
  };

  return (
    <div className="w-[650px] flex items-center p-4 border-b border-gray-200">
      <img
        src={lp.img}
        alt={`${lp.title}의 이미지`}
        className="w-25 h-25 object-cover mr-5"
      />
      <div className="flex-1">
        <h3 className="text-base font-semibold">{lp.title}</h3>
        <p className="text-xs text-gray-500">{lp.singer}</p>
        <p className="text-sm">{lp.price}원</p>
      </div>
      <div className="flex gap-2.5">
        <button onClick={handleDecreaseCount}>
          <CircleMinus className="text-gray-600 cursor-pointer hover:text-gray-800" />
        </button>
        <span>{lp.amount}</span>
        <button onClick={handleIncreaseCount}>
          <CirclePlus className="text-gray-600 cursor-pointer hover:text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
