import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { removeFromCart, clearCart, decreaseQuantity, addToCart } from '../features/cart/cartSlice'

const Cart = () => {
  const items = useSelector(state => state.cart.items)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
  const handleProceedToPayment = () => {
    // Redirect to payment options page
    navigate('/payment')
  }

  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div>Sepetiniz boş.</div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Sepetim</h2>
      <ul className="divide-y">
        {items.map(item => (
          <li key={item.id} className="flex items-center py-4">
            <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded mr-4" />
            <div className="flex-1">
              <div className="font-semibold">{item.title}</div>
              <div className="text-gray-600">₺{item.price}</div>
              <div className="flex items-center mt-1">
                <button onClick={() => dispatch(decreaseQuantity(item.id))} className="px-2">-</button>
                <span className="mx-2">{item.quantity}</span>
                <button onClick={() => dispatch(addToCart(item))} className="px-2">+</button>
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item.id))}
              className="ml-4 text-red-500 hover:underline"
            >Kaldır</button>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-6">
        <span className="font-bold">Toplam:</span>
        <span className="text-xl">₺{total.toFixed(2)}</span>
      </div>
      <div className="flex justify-between mt-4">
        <button onClick={() => dispatch(clearCart())} className="bg-red-500 text-white px-4 py-2 rounded">Sepeti Temizle</button>
        <button onClick={handleProceedToPayment} className="bg-green-600 text-white px-4 py-2 rounded">Sipariş Ver</button>
      </div>
    </div>
  )
}

export default Cart
