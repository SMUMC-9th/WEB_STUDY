import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../app/store";
import { openModal } from "../features/modal/modalSlice";

export default function CartFooter() {
  const dispatch = useDispatch<AppDispatch>();
  const { amount, total } = useSelector((state: RootState) => state.cart);

  return (
    <div
      className="w-full bg-white rounded-t-2xl p-5
                shadow-[0_8px_30px_rgba(0,0,0,0.25)]
                shadow-black/20"
    >
      <div className="flex gap-2 items-center mb-3">
        <p className="text-base text-gray-600">총 수량</p>
        <span className="text-lg font-semibold text-blue-600">{amount}</span>
      </div>

      <div className="flex gap-2 items-center mb-4">
        <p className="text-base text-gray-600">총 금액</p>
        <span className="text-xl font-bold text-green-600">
          {total.toLocaleString()}원
        </span>
      </div>

      <button
        className="w-full py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 active:scale-[0.98] transition"
        onClick={() => dispatch(openModal())}
      >
        전체 삭제
      </button>
    </div>
  );
}
