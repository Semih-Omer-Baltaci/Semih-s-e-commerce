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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Profil</h2>
        <div className="mb-4 text-center">
          <span className="font-semibold">Kullanıcı Adı:</span> {user.username}
        </div>
        <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-700 transition-colors">Çıkış Yap</button>
      </div>
    </div>
  )
}

export default Profile
