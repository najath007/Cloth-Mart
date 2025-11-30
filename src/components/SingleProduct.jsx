import React from 'react'
import api from '../api/axiosInstance'
import { useSelector } from 'react-redux'

export default function SingleProduct() {

  const item = useSelector((state)=> state.product.id )   

  return (
    <div>
      
    </div>
  )
}
