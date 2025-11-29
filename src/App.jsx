import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Cart from './pages/Cart'
import Favorite from './pages/Favorite'
import Login from './pages/Login'
import { Route,Routes } from 'react-router-dom'

function App() {
  return (
    <div>
        <Header />
      <div className='mt-16'>
        <Routes>
            <Route path='/' element={<Home />}/>
            <Route path='/cart' element={<Cart/>}/>
            <Route path='/favorite' element={<Favorite />}/>
            <Route path='/login' element={<Login/>}/>
        </Routes>
      </div>

    </div>
  )
}

export default App
