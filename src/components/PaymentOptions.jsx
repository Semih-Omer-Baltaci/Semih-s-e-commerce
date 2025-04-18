import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { placeOrder } from '../features/orders/ordersSlice'
import { clearCart } from '../features/cart/cartSlice'
import CreditCardForm from './CreditCardForm'

const PaymentOptions = () => {
  const cartItems = useSelector(state => state.cart.items)
  const savedCards = useSelector(state => state.payment?.savedCards || [])
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('creditCard')
  const [selectedCard, setSelectedCard] = useState(savedCards[0]?.id || '')
  const [showNewCardForm, setShowNewCardForm] = useState(savedCards.length === 0)
  const [orderComplete, setOrderComplete] = useState(false)
  
  // Calculate cart total
  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  
  // If no items in cart, redirect to cart page
  if (cartItems.length === 0 && !orderComplete) {
    navigate('/cart')
    return null
  }
  
  const handleCompleteOrder = () => {
    // Place the order
    dispatch(placeOrder({
      items: [...cartItems],
      totalAmount: total,
      paymentMethod: selectedPaymentMethod,
      cardId: selectedPaymentMethod === 'creditCard' && !showNewCardForm ? selectedCard : null
    }))
    
    // Clear the cart
    dispatch(clearCart())
    
    // Show success message and redirect after a delay
    setOrderComplete(true)
    setTimeout(() => {
      navigate('/profile')
    }, 3000)
  }
  
  if (orderComplete) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          Siparişiniz başarıyla tamamlandı. Profil sayfanıza yönlendiriliyorsunuz...
        </div>
      </div>
    )
  }
  
  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">Ödeme Seçenekleri</h2>
      
      {/* Payment method selection */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-3">Ödeme Yöntemi</h3>
        <div className="space-y-3">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={selectedPaymentMethod === 'creditCard'}
              onChange={() => setSelectedPaymentMethod('creditCard')}
              className="mr-2"
            />
            <span>Kredi Kartı</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="transfer"
              checked={selectedPaymentMethod === 'transfer'}
              onChange={() => setSelectedPaymentMethod('transfer')}
              className="mr-2"
            />
            <span>Havale / EFT</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="payAtDoor"
              checked={selectedPaymentMethod === 'payAtDoor'}
              onChange={() => setSelectedPaymentMethod('payAtDoor')}
              className="mr-2"
            />
            <span>Kapıda Ödeme</span>
          </label>
        </div>
      </div>
      
      {/* Credit card options - only show when credit card payment method is selected */}
      {selectedPaymentMethod === 'creditCard' && (
        <div className="mb-8 bg-gray-50 p-4 rounded">
          <h3 className="text-lg font-semibold mb-3">Kredi Kartı</h3>
          
          {/* Saved cards section */}
          {savedCards.length > 0 && (
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Kayıtlı Kartlar</span>
                <button 
                  onClick={() => setShowNewCardForm(!showNewCardForm)}
                  className="text-blue-500 text-sm underline"
                >
                  {showNewCardForm ? 'Kayıtlı kart kullan' : 'Yeni kart ekle'}
                </button>
              </div>
              
              {!showNewCardForm && (
                <div className="space-y-2">
                  {savedCards.map(card => (
                    <label key={card.id} className="flex items-center p-2 border rounded bg-white">
                      <input
                        type="radio"
                        name="savedCard"
                        value={card.id}
                        checked={selectedCard === card.id}
                        onChange={() => setSelectedCard(card.id)}
                        className="mr-2"
                      />
                      <div>
                        <div className="font-medium">
                          **** **** **** {card.lastFourDigits}
                        </div>
                        <div className="text-sm text-gray-600">
                          {card.cardholderName} - {card.expiryMonth}/{card.expiryYear}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {/* New card form */}
          {(showNewCardForm || savedCards.length === 0) && (
            <CreditCardForm />
          )}
        </div>
      )}
      
      {/* Order summary */}
      <div className="border-t pt-4 mt-8">
        <div className="flex justify-between font-bold text-lg mb-4">
          <span>Toplam:</span>
          <span>₺{total.toFixed(2)}</span>
        </div>
        
        <button
          onClick={handleCompleteOrder}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-colors"
        >
          Siparişi Tamamla
        </button>
      </div>
    </div>
  )
}

export default PaymentOptions
