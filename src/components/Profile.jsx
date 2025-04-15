import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const user = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/')
  }

  if (!user) {
    return <div className="flex items-center justify-center min-h-screen">Giriş yapmalısınız.</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-pink-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 flex flex-col items-center">
        <img
          src={user.avatar}
          alt={user.username}
          className="w-24 h-24 rounded-full border-4 border-blue-300 shadow mb-4 object-cover"
        />
        <h2 className="text-2xl font-bold mb-2 text-center">{user.username}</h2>
        <div className="mb-4 text-center text-gray-600">
          <span className="font-semibold">E-posta:</span> {user.email}
        </div>
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 transition-colors mt-4">Çıkış Yap</button>
      </div>
    </div>
  )
}

export default Profile
