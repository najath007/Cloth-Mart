import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "../features/productSlice";
import { addToCart } from "../features/cartSlice";
import { Heart, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../api/axiosInstance";

export default function Home() {
  const dispatch = useDispatch();
  // const { items, status } = useSelector((state) => state.products);
  const { cartItems } = useSelector((state) => state.cart)
  const [products, setProducts] = useState([])

   
  
  useEffect(()=>{
    axios
      .get(api)
      .then(res=>setProducts(res.json))
      .catch(err=>console.log(err))
  })

  // useEffect(() => {
  //   dispatch(fetchProducts());
  // }, [dispatch]);


 //----------------- ❤️ Like handle ---------------------
  const [like, setLike] = useState([]);
  
  const handleLike = (id, e) => {
    e.stopPropagation();
    e.preventDefault();

    if (like.includes(id)) {
      setLike(like.filter((item) => item !== id));
    } else {
      setLike([...like, id]);
    }
  };
// ---------------------------------------------------------------


  // 🛒 Add to Cart Redux handler
  const handleCart = (item, e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCart(item));
  };

  if (status === "loading") {
    return <div className="p-10 text-xl font-bold">Loading product...</div>;
  }

  if (status === "failed") {
    return <div className="p-10 text-red-500">Failed to load products</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">

      {items.map((item) => (
        <div
          key={item.id}
          className="shadow p-4 rounded-md relative hover:shadow-md transition"

        >

          {/* ❤️ LIKE BUTTON */}
          <button className="absolute top-3 right-3" onClick={(e) => handleLike(item.id, e)}>{
            like.includes(item.id) ? (<Heart fill="red" />) : (<Heart />)}
          </button>

          {/*  PRODUCT CLICK AREA */}
          <Link to={`/product/${item.id}`}>

            {/* IMAGE */}
            <img src={item.image} alt="" className="h-40 mx-auto" />

            {/* TITLE */}
            <h2 className="text-lg font-semibold mt-3 truncate"title={item.title}>{item.title}</h2>

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
            <button onClick={(e) => handleCart(item, e)}>
               {cartItems.some(p=> p.id === item.id ) ? (<ShoppingCart fill="red"/>) : (<ShoppingCart/>)}
               </button>
          </div>
        </div>
      ))}
    </div>
  );
}
