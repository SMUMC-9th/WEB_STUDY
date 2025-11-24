import { useDispatch, useSelector } from "../../hooks/useCustomRedux";
import { clearCart } from "../../slices/cartSlice";
import { closeModal } from "../../slices/modalSlice";

export const Modal = () => {
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.modal);

  const handleClearCart = () => {
    dispatch(clearCart()); //삭제하고
    dispatch(closeModal()); // 모달 바로 닫히게
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return (
    isOpen && (
      <div className="fixed bg-black/50 inset-0 flex h-full w-full justify-center items-center">
        <div className="bg-gray-100 p-10 rounded-2xl shadow-lg max-w-md w-full">
          <div className="text-xl font-bold mb-4 text-center">
            장바구니 전체 삭제
          </div>

          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={handleClearCart}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 "
            >
              삭제하기
            </button>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              취소하기
            </button>
          </div>
        </div>
      </div>
    )
  );
};
