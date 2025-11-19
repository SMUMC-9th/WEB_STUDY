import {useSelector, useDispatch} from "../hooks/useCustomRedux.ts";
import {clearCart} from "../slices/cartSlice.ts";

export default function PriceBox() {
  const {total} = useSelector((state) => state.cart)
  const dispatch = useDispatch();

  const handleInitialzeCart = () => {
    dispatch(clearCart());
  };

  return (
    <div className="p-12 flex justify-between cursor-pointer">
      <button
        onClick={handleInitialzeCart}
        className='border p-4 rounded-md'>장바구니 초기화</button>
      <div>총 가격 : {total}원</div>
    </div>
  );
}
