import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'

const Profile = () => {
  const user = useSelector(state => state.auth.user)
  const orderHistory = useSelector(state => state.orders.orderHistory)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('profile')

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Giriş yapmalısınız.</div>
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd.MM.yyyy HH:mm')
    } catch (e) {
      return dateString
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-pink-100 py-10">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl">
        {/* Tabs */}
        <div className="flex border-b">
          <button 
            className={`py-3 px-6 ${activeTab === 'profile' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('profile')}
          >
            Profil Bilgileri
          </button>
          <button 
            className={`py-3 px-6 ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-500 font-medium' : 'text-gray-500'}`}
            onClick={() => setActiveTab('orders')}
          >
            Sipariş Geçmişi
          </button>
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="p-8 flex flex-col items-center">
            <img
              src={user.avatar}
              alt={user.username}
              className="w-24 h-24 rounded-full border-4 border-blue-300 shadow mb-4 object-cover"
            />
            <h2 className="text-2xl font-bold mb-2 text-center">{user.username}</h2>
            <div className="mb-4 text-center text-gray-600">
              <span className="font-semibold">E-posta:</span> {user.email}
            </div>
            <button onClick={handleLogout} className="w-full max-w-xs bg-red-500 text-white py-2 rounded hover:bg-red-700 transition-colors mt-4">Çıkış Yap</button>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Sipariş Geçmişi</h2>
            
            {orderHistory.length === 0 ? (
              <p className="text-gray-500 text-center py-8">Henüz sipariş geçmişiniz bulunmamaktadır.</p>
            ) : (
              <div className="space-y-6">
                {orderHistory.map(order => (
                  <div key={order.id} className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b flex justify-between items-center">
                      <div>
                        <span className="font-medium">Sipariş No:</span> {order.id}
                      </div>
                      <div>
                        <span className="font-medium">Tarih:</span> {formatDate(order.date)}
                      </div>
                      <div>
                        <span className="font-medium">Toplam:</span> ₺{order.totalAmount.toFixed(2)}
                      </div>
                    </div>
                    
                    <div className="divide-y">
                      {order.items.map(item => (
                        <div key={`${order.id}-${item.id}`} className="flex items-center p-4">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-16 h-16 object-cover rounded mr-4" 
                          />
                          <div className="flex-1">
                            <div className="font-medium">{item.title}</div>
                            <div className="text-sm text-gray-500">
                              ₺{item.price} x {item.quantity} = ₺{(item.price * item.quantity).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
