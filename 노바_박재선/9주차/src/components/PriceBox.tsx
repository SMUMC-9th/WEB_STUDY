import { useDispatch, useSelector } from "../hooks/useCustomRedux";
import { openModal } from "../features/modal/modalSlice";
import { useCartInfo } from "../hooks/useCartStore";

const PriceBox = () => {
  const { total } = useCartInfo();
  const dispatch = useDispatch();

  const handleOpenModal = () => {
    dispatch(openModal());
  };
  return (
    <div className="p-10 flex justify-end gap-4 items-center">
      <button
        onClick={handleOpenModal}
        className="border p-4 rounded-md cursor-pointer hover:bg-red-400 hover:border-red-400 transition-colors"
      >
        장바구니 초기화
      </button>
      <div>총 가격 : {total}원</div>
    </div>
  );
};

export default PriceBox;
