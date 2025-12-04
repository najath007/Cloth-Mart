import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import { addToCart, removeFromCart } from "../features/cartSlice"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"



export default function SingleProduct() {

   const { id } = useParams()
   const [loading,setLoading]=useState(true)
   const [product ,setProduct] =useState ({})
   const dispatch = useDispatch()
   const { cartItems } = useSelector((state)=> state.cart)
   


  useEffect(()=>{
    axios
    .get(`https://fakestoreapi.com/products/${id}`)
    .then(res =>setProduct(res.data))
    .catch(err=> console.log(err))
    .finally(()=>setLoading(false))
  },[id])

   
  if (loading)return <div className="">loading..</div>
  if(!product)return <div>No product found</div>
    

  const handleCart = (item)=>{
    dispatch(addToCart(item))
  } 

  return (
    <div className="p-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

      <img src={product.image} className="w-full h-90 object-contain" />

      <div> 
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-500 mt-3">{product.category}</p>
        <p className="text-3xl mt-4 font-bold text-yellow-500">₹{product.price}</p>
        <p className="text-m rounded-md shadow-md w-fit"> ⭐{product.rating.rate}</p>
        <p className="mt-4 text-gray-700 leading-7">{product.description}</p>
        <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg" onClick={()=> {handleCart(product); toast.success("added to cart")}}>
          {cartItems.some((p)=>p.id === product.id) ? ("already added") : ("add to cart")}
        </button>
      </div>

    </div>
  );
}
