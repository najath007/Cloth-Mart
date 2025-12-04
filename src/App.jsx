import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import SingleProduct from './components/SingleProduct'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import axios from "axios";
import { useState, useEffect } from "react";

function App() {

  const [products, setProducts] = useState([]);
  const [searchBar, setSearchBar] = useState("");

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products")
      .then(res => setProducts(res.data));
  }, []);

  return (
    <div>
      <Header searchBar={searchBar} setSearchBar={setSearchBar} />
      <Toaster />

      <div className='mt-16'>
        <Routes>
          <Route path='/' element={<Home products={products} searchBar={searchBar} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<SingleProduct />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
