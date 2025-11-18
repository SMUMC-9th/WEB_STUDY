import { useCartStore } from "../stores/cartStore";
import { useModalStore } from "../stores/modalStore";

export default function CartFooter() {
  const { total, amount } = useCartStore();
  const open = useModalStore((state) => state.open);

  return (
    <div className="bg-white shadow-md p-4 border-t">
      <p className="text-xl font-semibold">
        총 수량: <span className="text-blue-600">{amount}</span>
      </p>

      <p className="text-xl font-bold">
        총 금액:{" "}
        <span className="text-green-600">{total.toLocaleString()}</span>원
      </p>

      <button
        className="w-full mt-4 bg-red-500 text-white p-2 rounded hover:bg-red-600"
        onClick={open}
      >
        전체 삭제
      </button>
    </div>
  );
}
