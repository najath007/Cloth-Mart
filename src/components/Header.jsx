import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, ShoppingCart, Heart,User,Search, Filter} from 'lucide-react'

export default function Header() {
  const [cart, setCart] = useState(false)
  const [like, setLike] = useState(false)

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="shadow-xl flex items-center px-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img className="w-12" src="logo.png" alt="logo" />
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <input
            className="bg-slate-100 border rounded px-3 py-1 w-1/2"
            type="text"
            placeholder="abcd"
          />
          <button className="ml-2 px-3 py-1 border rounded"><Search/></button>
          <button className='ml-2'><Filter /></button>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-10 text-xl">

          {/* Cart Button */}
          <button onClick={() => setCart(true)}><ShoppingCart/></button>
          {cart && (
            <div
              className="fixed inset-0 backdrop-blur-sm" 
              onClick={() => setCart(false)}>
             </div>
          )}

          {/* Sliding Panel */}
          <div
            className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-xl p-6 transition-transform duration-300 ${
              cart ? "translate-x-0" : "translate-x-full"
            }`}>
              
            <h2 className="text-xl font-bold mb-4">CART</h2>
              <button onClick={() => setCart(false)}className="px-4 py-2 bg-red-500 text-white rounded">Close</button>
          </div>



          {/* sliding like btn */}

          <button onClick={()=> setLike(true)}><Heart/></button>
          {like &&(
            <div
              className='fixed inset-0 backdrop-blur-sm'
              onClick={()=> setLike(false)}></div>
          )}

          <div
            className={`fixed top-0 right-0 h-full w-1/2 bg-white shadow-xl p-6 transition-transform duration-300 ${
              like ? "translate-x-0" : "translate-x-full"
            }`}>

              <h2 className='text-xl font-bold mb-4'>like</h2>
              <button onClick={()=> setLike(false)} className='px-4 py-2 bg-red-500 text-white rounded'>close</button>
            </div>

          
          <Link to="/login"><User/></Link>
        </div>
      </div>
    </div>
  )
}
