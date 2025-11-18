import CartItem from "./CartItem.tsx";
import {useSelector} from "../hooks/useCustomRedux.ts";

export default function CartList() {

  // useSelector: 리덕스 스토어에 저장된 상태를 읽는 함수
  // 리덕스 스토어는 전역으로 저장돼 있는데, 그걸 컴포넌트에서 쓰려면 꺼내와야 함. 이 꺼내오는 역할이 useSelector
  const {cartItems, amount, total} = useSelector((state) => state.cart);

  return (
    <div className ='flex flex-col items-center justify-center'>
      <ul>
        {cartItems.map((item) => (
          <CartItem key = {item.id} lp = {item}/>
        ))}
      </ul>
    </div>
  );
}
