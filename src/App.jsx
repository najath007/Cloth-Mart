import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import SingleProduct from './components/SingleProduct'
import { Route,Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'





function App() {
  return (
    <div>
        <Header />
        <Toaster />
      <div className='mt-16'>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/product/:id'element={<SingleProduct />}/>
        </Routes>
      </div>

    </div>
  )
}

export default App
