import { closeModal } from "../features/modal/modalSlice";
import { useCartActions } from "../hooks/useCartStore";
import { useDispatch, useSelector } from "../hooks/useCustomRedux";

const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);
  const { clearCart } = useCartActions();
  if (!isOpen) return null;

  const handleCancel = () => {
    dispatch(closeModal());
  };

  const handleConfirm = () => {
    clearCart();
    dispatch(closeModal());
  };
  return (
    <div
      className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={handleCancel}
    >
      <div className="bg-white rounded-lg p-7 max-w-3xs w-full mx-4 shadow-2xl">
        <p className="text-black font-bold mb-4 text-lg text-center">
          정말 삭제하시겠습니까?
        </p>
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-400 transition-colors cursor-pointer"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-800 transition-colors cursor-pointer"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
