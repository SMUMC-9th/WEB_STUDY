import CartItem from "./CartItem";
import { useAppSelector } from "../hooks/useCustomRedux";

const CartList = () => {
  const { cartItems } = useAppSelector((state) => state.cart);

  return (
    <div className="flex flex-col justify-center items-center my-10">
      <ul>
        {cartItems.map((item) => (
          <CartItem key={item.id} lp={item} />
        ))}
      </ul>
    </div>
  );
};

export default CartList;
