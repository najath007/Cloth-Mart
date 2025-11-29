import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/productSlice";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "react-toastify";

export default function Home() {
  const dispatch = useDispatch();

  const { items, status } = useSelector((state) => state.products);

  const [selectedProduct, setselectedProduct] = useState(null);
  const [sideBar, setSideBar] = useState(false);
  const [like, setLike] = useState([]);
  const [addToCart, setAddToCart]= useState([]);

 
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  const handlecart=(id,e)=>{
    e.stopPropagation();
    if(addToCart.includes(id)){
      setAddToCart(addToCart.filter((item) => item !==id))
    }else{
      setAddToCart([...addToCart,id])
    }
  }

// like button
  const handlelike = (id, e) => {
    e.stopPropagation();
    if (like.includes(id)) {
      setLike(like.filter((item) => item !== id));
    } else {
      setLike([...like, id]);
    }
  };


  const handleClick = () => {
    toast.success("Added To Cart");
  };


  if (status === "loading") {
    return <div className="p-10 text-xl font-bold">Loading products...</div>;
  }

  if (status === "failed") {
    return <div className="p-10 text-red-500">Failed to load products</div>;
  }


  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 p-10">

  
      {items.map((item) => (
        <div
          key={item.id}
          className="shadow p-4 rounded-md relative hover:shadow-md"
          onClick={() => {
            setselectedProduct(item);
            setSideBar(true);
          }}>
         
          <button
            className="absolute top-3 right-3"
            onClick={(e) => handlelike(item.id, e)}>
            {like.includes(item.id) ? <Heart fill="red" /> : <Heart />}
          </button>

          
          <img src={item.image} alt="" className="h-40 mx-auto" />

          
          <h2
            className="text-lg font-semibold mt-3 truncate"
            title={item.title}>
            {item.title}
          </h2>

         
          <p className="text-gray-600 text-sm mt-2">
            Category : {item.category}
          </p>

          
          <div className="flex justify-between items-center mt-2">
            <p className="font-bold bg-yellow-400 w-fit px-2 py-1 rounded">
              ₹{item.price}
            </p>

            <button onClick={(e) => {handlecart(item.id,e); handleClick()}}>{addToCart.includes(item.id) ? <ShoppingCart fill="red"/> : <ShoppingCart /> }</button>
          </div>
        </div>
      ))}

    
      {sideBar && (
        <div
          className="fixed inset-0 backdrop-blur-sm"
          onClick={() => setSideBar(false)}
        ></div>
      )}

      
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-xl p-6 transition-transform duration-300 
        ${sideBar ? "translate-x-0" : "translate-x-full"}`}
      >
        
        {selectedProduct && (
          <>
            <img
              src={selectedProduct.image}
              className="h-40 mx-auto mt-24"/>

            <h2 className="mt-4 text-lg font-bold">
              {selectedProduct.title}
            </h2>

            <p className="text-gray-600 mt-2">
              {selectedProduct.category}
            </p>

            <p className="text-xl font-semibold mt-3">
              ₹{selectedProduct.price}
            </p>

            <p className="mt-4 text-sm">{selectedProduct.description}</p>
          <div className="flex justify-between">
             <button
              onClick={handleClick}
              className="bg-yellow-300 px-4 py-1 rounded mt-4">
              Add To Cart
            </button>

            <button
              onClick={() => setSideBar(false)}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded">
              Close
            </button>
          </div>
           
          </>
        )}
      </div>

    </div>
  );
}
