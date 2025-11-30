import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { Heart, Link, ShoppingCart } from "lucide-react";

  
export default function Home() {
  const dispatch = useDispatch();

  // ⬇️ Get products & loading status from Redux store
  const { items, status } = useSelector((state) => state.products);


  // ⬇️ State for liked items (stores ids)
  const [like, setLike] = useState([]);

  // ⬇️ State for cart items (stores ids)
  const [addToCart, setAddToCart] = useState([]);

 
  // ⬇️ Fetch products first time when page loads
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  // -----------------------
  // ADD / REMOVE FROM CART
  // -----------------------
  const handlecart = (id, e) => {
    e.stopPropagation(); // prevent opening sidebar

    if (addToCart.includes(id)) {
      // remove item from cart
      setAddToCart(addToCart.filter((item) => item !== id));
    } else {
      // add item to cart
      setAddToCart([...addToCart, id]);
    }
  };

  // -----------------------
  // ADD / REMOVE LIKE
  // -----------------------
  const handlelike = (id, e) => {
    e.stopPropagation(); // prevent opening sidebar

    if (like.includes(id)) {
      setLike(like.filter((item) => item !== id));
    } else {
      setLike([...like, id]);
    }
  };

  // -----------------------
  // LOADING & ERROR UI
  // -----------------------
  if (status === "loading") {
    return <div className="p-10 text-xl font-bold">Loading products...</div>;
  }

  if (status === "failed") {
    return <div className="p-10 text-red-500">Failed to load products</div>;
  }

  // -----------------------
  // MAIN UI
  // -----------------------
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">

      {/* -------------------------
           PRODUCT GRID LIST
      -------------------------- */}
      {items.map((item) => (
        <div key={item.id}className="shadow p-4 rounded-md relative hover:shadow-md"onClick={() => <Link to={'/product'}>{item.id} </Link>} >

          {/* ❤️ LIKE BUTTON */}
          <button className="absolute top-3 right-3"onClick={(e) => handlelike(item.id, e)}>{
            like.includes(item.id) ? (<Heart fill="red" />) : (<Heart />)}</button>

          {/* 🖼 PRODUCT IMAGE */}
          <img src={item.image} alt="" className="h-40 mx-auto" />

          {/* 📝 PRODUCT TITLE */}
          <h2
            className="text-lg font-semibold mt-3 truncate"
            title={item.title}
          >
            {item.title}
          </h2>

          {/* CATEGORY */}
          <p className="text-gray-600 text-sm mt-2">
            Category : {item.category}
          </p>

          {/* PRICE + CART BUTTON */}
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold bg-yellow-400 w-fit px-2 py-1 rounded">
              ₹{item.price}
            </p>

            {/* 🛒 CART BUTTON */}
            <button onClick={(e) => {handlecart(item.id, e); // add/remove cart
                handlecart();          // toast message
              }}>
            {addToCart.includes(item.id) ? (<ShoppingCart fill="red" />) : (<ShoppingCart />)}</button>
          </div>
        </div>
      ))}

    </div>
  );
}
