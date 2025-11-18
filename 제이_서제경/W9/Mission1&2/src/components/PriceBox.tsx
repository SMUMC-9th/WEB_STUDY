import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";
import { openModal } from "../slices/modalSlice";
import { Modal } from "./modal/Modal";

function PriceBox() {
  const { total } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const handleInitializeCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveCart = () => {
    dispatch(openModal());
  };

  return (
    <div className="p-12 flex justify-between">
      <div className="flex gap-3">
        <button
          onClick={handleInitializeCart}
          className="border p-3 rounded-md cursor-pointer "
        >
          장바구니 초기화
        </button>
        <button
          onClick={handleRemoveCart}
          className="border p-3 rounded-md cursor-pointer"
        >
          장바구니 비우기
        </button>
      </div>
      <Modal />
      <div>총 가격: {total}원</div>
    </div>
  );
}

export default PriceBox;
