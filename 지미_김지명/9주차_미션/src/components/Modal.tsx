import { useModalIsOpen, useModalActions } from "../hooks/useModalStore";
import { useCartActions } from "../hooks/useCartStore";

const Modal = () => {
  const isOpen = useModalIsOpen();
  const { closeModal } = useModalActions();
  const { clearCart } = useCartActions();

  const handleConfirm = () => {
    clearCart();
    closeModal();
  };

  const handleCancel = () => {
    closeModal();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div className="bg-white p-6 rounded-lg shadow-xl">
        <h2 className="text-xl font-semibold mb-4">정말 삭제하시겠습니까?</h2>
        <div className="flex gap-4 justify-end">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            아니요
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            네
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
