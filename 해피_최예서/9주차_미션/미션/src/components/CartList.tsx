import CartItem from "./CartItem";
import { useCartInfo } from "../hooks/useCartStore";
import { useModalStore } from "../hooks/useModalStore";

export default function CartList() {
  const { cartItems } = useCartInfo();
  const openModal = useModalStore((state) => state.openModal);

  return (
    <div className="flex flex-col items-center justify-center">
      {cartItems.length === 0 && (
        <div className="my-10">
          <p className="text-2xl font-semibold">장바구니가 비어있습니다.</p>
        </div>
      )}

      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>

      <button
        onClick={openModal}
        className="p-4 border rounded-md my-10"
      >
        전체 삭제
      </button>
    </div>
  );
}
