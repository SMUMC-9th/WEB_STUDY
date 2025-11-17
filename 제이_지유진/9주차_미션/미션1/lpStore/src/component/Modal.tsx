import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../features/modal/modalSlice";
import { clearCart } from "../features/cart/cartSlice";
import type { RootState, AppDispatch } from "../app/store";

export default function Modal() {
  const dispatch = useDispatch<AppDispatch>();
  const { isOpen } = useSelector((state: RootState) => state.modal);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/60">
      <div className="bg-white p-6 rounded shadow-md w-80 text-center">
        <h2 className="text-lg font-bold mb-4">정말 전체 삭제할까요?</h2>

        <div className="flex justify-center items-center gap-2 mt-4">
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
            onClick={() => {
              dispatch(clearCart());
              dispatch(closeModal());
            }}
          >
            네
          </button>

          <button
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
            onClick={() => dispatch(closeModal())}
          >
            아니요
          </button>
        </div>
      </div>
    </div>
  );
}
