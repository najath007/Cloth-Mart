import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
// import { fetchProducts } from "../features/productSlice"

export default function SingleProduct() {

   const { id } = useParams()
   const dispatch = useDispatch()
   const {items, status} = useSelector((state)=>state.products)

   useEffect(() => {
    if (items.length === 0) dispatch(fetchProducts());
  }, []);
   
   const product = items.find((p)=>p.id === Number(id))

   if(status === "loading" || !product  ){
    return <div>loading products...</div>
  }

  return (
    <div className="p-10 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">

      <img src={product.image} className="w-full h-90 object-contain" />

      <div> 
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <p className="text-gray-500 mt-3">{product.category}</p>
        <p className="text-3xl mt-4 font-bold text-yellow-500">₹{product.price}</p>
        <p className="mt-4 text-gray-700 leading-7">{product.description}</p>
        <button className="mt-6 bg-black text-white px-6 py-3 rounded-lg"> Add to Cart</button>
      </div>

    </div>
  );
}
