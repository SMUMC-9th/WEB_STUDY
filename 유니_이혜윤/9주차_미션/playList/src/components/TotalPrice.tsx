import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { openModal, closeModal } from "../slices/modalSlice";
import Modal from "./Modal";

const TotalPrice = () => {
  const { total } = useAppSelector((state) => state.cart);
  const { isOpen } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };

  const handleConfirm = () => {
    dispatch(clearCart());
    dispatch(closeModal());
  };

  const handleCancel = () => {
    dispatch(closeModal());
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
