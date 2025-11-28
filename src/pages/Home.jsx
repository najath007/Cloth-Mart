import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { items, status } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const [like,setLike]=useState("")

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">
      {items.map((item) => (
        <div
          key={item.id}
          className="shadow p-4 rounded relative"
          onClick={() => navigate(`/product/${item.id}`)}
        >
          <button className="text-3xl w-7" onClick={(e)=>{e.stopPropagation();setLike((prev)=>!prev)}}>{like ? "♥️" :"♡"}</button>
          <img src={item.image} alt="" className="h-40 mx-auto" />
          <h2 className="text-lg font-semibold mt-3">{item.title}</h2>
          <p className="text-gray-600 text-sm mt-2">{item.category}</p>
          <p className="mt-2 font-bold bg-yellow-400 w-fit">₹{item.price}</p>
          
        </div>
      ))}
    </div>
  );
}
