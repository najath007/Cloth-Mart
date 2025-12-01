import { useSelector, useDispatch } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from "../features/cartSlice";

export default function Cart() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const total = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b py-4"
          >
            <div className="flex items-center gap-4">
              <img src={item.image} className="w-20" />
              <div>
                <h2 className="font-bold">{item.title}</h2>
                <p>₹{item.price}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button onClick={() => dispatch(decreaseQty(item.id))}>-</button>
              <span>{item.qty}</span>
              <button onClick={() => dispatch(increaseQty(item.id))}>+</button>
            </div>

            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="text-red-500"
            >
              Remove
            </button>
          </div>
        ))
      )}

      <h2 className="text-xl font-bold mt-6">
        Total: ₹{total.toFixed(2)}
      </h2>
    </div>
  );
}
