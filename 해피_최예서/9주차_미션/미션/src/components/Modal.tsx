import { useModalStore } from "../hooks/useModalStore";
import { useCartActions } from "../hooks/useCartStore";

export default function Modal() {
  const { isOpen, closeModal } = useModalStore();
  const { clearCart } = useCartActions();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex justify-center items-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white rounded-lg p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">장바구니를 비우시겠습니까?</h2>

        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded"
            onClick={closeModal}
          >
            아니요
          </button>

          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => {
              clearCart();
              closeModal();
            }}
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
}
