import { useState } from 'react'
import logo from "../assets/logo.png";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import { ShoppingCart, Heart, User, Search, Filter, PlusSquare, MinusSquare, Beer } from 'lucide-react'
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, decreaseQty, removeFromCart } from '../features/cartSlice';
import { removeFromLike } from '../features/likeSlice';


export default function Header({ searchBar, setSearchBar }) {

  const Navigate = useNavigate()
  const dispatch = useDispatch()
  const [cart, setCart] = useState(false);
  const [like, setLike] = useState(false);
  const [dropDown, setDropDown] = useState(false)
 



  // 👉 Get cart items from Redux
  const { cartItems } = useSelector((state) => state.cart);
  const { likeItems } = useSelector((state) => state.like)
  const totalQty = cartItems.reduce((add, item) => add + item.qty, 0)  //to show cart count
  const subTotal = cartItems.reduce((add, item) => add + item.price * item.qty, 0) // total amount
   



  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="shadow-xl flex items-center px-4 py-3">

        {/* Logo */}
        <button className="flex items-center" onClick={() => Navigate('/')}>
          <img className="w-12" src={logo} alt="logo" />
        </button>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <input
            className="bg-slate-100 border rounded px-3 py-1 w-1/2"
            type="text"
            placeholder="abcd"
            value={searchBar}
            onChange={(e) => setSearchBar(e.target.value)}
          />


          <button className="ml-2 px-3 py-1 border rounded"><Search /></button>
          <button className='ml-2' onClick={()=>setDropDown(!dropDown)}><Filter /></button>
          {dropDown && (
            <button>{categor}</button>
          )}
        </div>



        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-10 text-xl">


          {/*  --------------------------C A R T------------------------------------------------------------------------- */}


          {/* Cart Button WITH COUNT */}
          <button onClick={() => setCart(true)} className="relative hover:text-yellow-500 mt-1">
            <ShoppingCart />

            {/* 🔥 Cart count badge */}
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                {totalQty}
              </span>
            )}

          </button>

          {/* Background blur */}
          {cart && (
            <div
              className="fixed inset-0 backdrop-blur-sm"
              onClick={() => setCart(false)}
            ></div>
          )}

          {/* Sliding Cart Panel */}
          <div
            className={`fixed z-50 top-0 right-0 h-full w-1/2 bg-white shadow-xl p-6 overflow-y-auto transition-transform duration-300 ${cart ? "translate-x-0" : "translate-x-full"
              }`} >
            <h2 className="text-xl font-bold mb-4">CART</h2>

            {/* If cart is empty */}
            {cartItems.length === 0 && (
              <p className="text-gray-500">Your cart is empty</p>
            )}

            {/* SHOW CART ITEMS */}
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b py-4 px-4">

                {/* Image */}
                <img
                  src={item.image}
                  className="w-20 h-20 object-contain"
                />

                {/* Title + Price */}
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600">₹{item.price}<div className=''></div></p>
                  <p className="text-sm text-gray-500">Qty: {item.qty} </p>
                  <p>₹{item.price * item.qty}</p>
                  <div className='gap'>
                    <button onClick={() => dispatch(increaseQty(item.id))}><PlusSquare className='hover:fill-green-500'/></button>
                    <button className=' w-5 ml-2' onClick={() => dispatch(decreaseQty(item.id))}><MinusSquare className='hover:fill-red-500'/></button>
                    <button className='ml-5' onClick={() => { dispatch(removeFromCart(item.id)); toast.error("item removed from cart") }}><Beer fill='red' /></button>
                  </div>

                </div>
              </div>
            ))}
            <div className='text-lg'>
              Total Amount = ₹{subTotal.toFixed(2)}
            </div>
           

            {/* Close Button */}
            <button onClick={() => setCart(false)}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Close</button>
          </div>


          {/* ----------------------------------------------------------------------------------------- */}

          {/* ----------------------L I K E -- B U T T O N--------------------------------------------- */}

          {/* Like Button */}
          <div>
            <button onClick={() => setLike(true)} className='hover:text-red-500 mt-2'>
              <Heart />
              {likeItems.length > 0 &&  ( //React uses && to decide whether to show a UI element or hide it.
              //This is called conditional rendering.

                <span className='bg-red-500 rounded-full text-white text-xs px-2 py-0.5 absolute top-4'>
                  {likeItems.length}
                </span>
              )}
            </button>
          </div>
          {/* Like BG blurr */}
          {like && (
            <div
              className="fixed inset-0 backdrop-blur-sm"
              onClick={() => setLike(false)}></div>
          )}

          {/* Sliding Like Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-1/2 bg-white overflow-y-auto shadow-xl p-6 transition-transform duration-300 
              ${like ? "translate-x-0" : "translate-x-full"}`}>

            {likeItems.length === 0 && (
              <p className="text-gray-500">No liked items</p>
            )}

            {likeItems.map((item) => (
              <div key={item.id} className="flex items-center gap-4 border-b py-4 px-4">

                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain"
                />

                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-gray-600 ">₹{item.price}</p>
                  <button className='bg-black text-white text-base flex rounded-lg w-28 justify-center'>add to cart</button>

                  {/* remove like button */}
                  <button
                    className="text-red-500 underline mt-2 text-sm"
                    onClick={() => dispatch(removeFromLike(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Close Like */}
            <button
              onClick={() => setLike(false)}
              className="mt-6 px-4 py-2 bg-red-500 text-white rounded">Close
            </button>
          </div>




         {/*------------------- Login Button ------------------------------------------------------*/}
    
          <button className="flex items-center gap-2 hover:text-blue-500">
            <User  />
            <span>Login</span>
            </button>             
        </div>
      </div>
    </div>
  );
}
