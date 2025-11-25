import { useCartActions, useCartInfo } from "../hooks/useCartStore";
import { useModalActions, useModalInfo } from "../hooks/useModalStore";
import Modal from "./Modal";

const TotalPrice = () => {
  const { total } = useCartInfo();
  const { clearCart } = useCartActions();
  const { isOpen } = useModalInfo();
  const { open, close } = useModalActions();

  const handleOpenModal = () => {
    open();
  };

  const handleConfirm = () => {
    clearCart();
    close();
  };

  const handleCancel = () => {
    close();
  };

  return (
    <div className="flex justify-between items-center px-10 py-4 max-w-5xl mx-auto">
      <button
        onClick={handleOpenModal}
        className="bg-red-100 text-sm text-gray-600 px-3 py-1.5 rounded cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div>총 가격 : {total}원</div>
      <Modal
        isOpen={isOpen}
        title="장바구니를 초기화하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default TotalPrice;
