import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X } from 'lucide-react' 

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 w-full bg-white z-50">
      <div className="shadow-xl flex items-center px-4 py-3">

        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img className="w-24" src="logo.png" alt="logo" />
        </Link>

        {/* Desktop Search Bar */}
        <div className="hidden md:flex flex-1 justify-center items-center">
          <input
            className="bg-slate-100 border rounded px-3 py-1 w-1/2"
            type="text"
            placeholder="abcd"
          />
          <button className="ml-2 px-3 py-1 border rounded">press</button>
        </div>

        {/* Desktop Icons */}
        <div className="hidden md:flex items-center gap-3  text-xl">
          <Link to="/cart">🛒</Link>
          <Link to="/favorite">❤️</Link>
          <Link to="/login">👤</Link>
        </div>
      </div>
    </div>
  )
}
