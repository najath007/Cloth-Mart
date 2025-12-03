import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cartSlice";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { addToLike, removeFromLike } from "../features/likeSlice";

export default function Home() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart)
  const { likeItems } = useSelector((state) => state.like)
  const [products, setProducts] = useState([])


  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err))
      .finally(()=>toast.success("fetch complete"))
  }, [])



  //----------------- ❤️ Like handle ---------------------
  

  const handleLike = (item, e) => {
    e.stopPropagation();
    e.preventDefault();

    const isLiked = likeItems.some(p=>p.id === item.id)
    
    if (isLiked) {
      dispatch(removeFromLike(item.id));
    } else {
      dispatch(addToLike(item));
    }
  };
  // ---------------------------------------------------------------


  // 🛒 Add to Cart Redux handler
  const handleCart = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(item));
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">

      {products.map((item) => (
        <div
          key={item.id}
          className="shadow p-4 rounded-md relative hover:shadow-md transition"

        >

          {/* ❤️ LIKE BUTTON */}
          <button className="absolute top-3 right-3" onClick={(e) => {handleLike(item, e);toast.success("aded to favorite ❤️")}}>
            {likeItems.some(p=> p.id === item.id) ? (<Heart fill="red" />) : (<Heart />)}
          </button>

          {/*  PRODUCT CLICK AREA */}
          <Link to={`/product/${item.id}`}>

            {/* IMAGE */}
            <img src={item.image} alt="" className="h-40 mx-auto" />

            {/* TITLE */}
            <h2 className="text-lg font-semibold mt-3 truncate" title={item.title}>{item.title}</h2>

            {/* CATEGORY */}
            <p className="text-gray-600 text-sm mt-2">
              Category: {item.category}
            </p>
          </Link>

          {/* PRICE + CART */}
          <div className="flex justify-between items-center mt-3">
            <p className="font-bold bg-yellow-400 w-fit px-2 py-1 rounded">
              ₹{item.price}
            </p>

            {/* 🛒 CART BUTTON */}
            <button onClick={(e) => {handleCart(item, e);toast.success("added to cart 🛒")}}>
              {cartItems.some(p => p.id === item.id) ? (<ShoppingCart fill="red" />) : (<ShoppingCart />)}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
