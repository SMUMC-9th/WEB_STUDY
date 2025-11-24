import { useAppDispatch, useAppSelector } from "../hooks/useCustomRedux";
import { clearCart } from "../slices/cartSlice";

const TotalPrice = () => {
  const { total } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="flex justify-between items-center px-10 py-4 max-w-5xl mx-auto">
      <button
        onClick={handleClearCart}
        className="bg-indigo-100 px-3 py-1 rounded cursor-pointer"
      >
        장바구니 초기화
      </button>
      <div>총 가격 : {total}원</div>
    </div>
  );
};

export default TotalPrice;
