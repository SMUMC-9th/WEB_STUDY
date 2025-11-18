import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { increase, decrease, removeItem } from "../features/cart/cartSlice";

export default function CartList() {
  const dispatch = useDispatch<AppDispatch>();
  const { cartItems } = useSelector((state: RootState) => state.cart);

  return (
    <div className="space-y-4 pb-32">
      {cartItems.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between rounded-xl p-4 shadow-lg bg-white hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-4">
            <img src={item.img} className="h-20 w-20 rounded" />
            <div>
              <h2 className="font-semibold">{item.title}</h2>
              <p className="text-sm text-gray-600">{item.singer}</p>
              <p className="text-blue-600 font-bold">{item.price}원</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* 수량 조절 */}
            <div className="flex items-center gap-2">
              <button
                className="rounded bg-gray-200 px-2 py-1"
                onClick={() => dispatch(decrease(item.id))}
              >
                -
              </button>
              <span>{item.amount}</span>
              <button
                className="rounded bg-gray-200 px-2 py-1"
                onClick={() => dispatch(increase(item.id))}
              >
                +
              </button>
            </div>

            <button
              className="rounded-md bg-red-500 px-2 py-1 text-sm text-white shadow-sm hover:bg-red-600 transition-colors"
              onClick={() => dispatch(removeItem(item.id))}
            >
              제거
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
