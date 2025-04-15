import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login, setError } from '../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const error = useSelector(state => state.auth.error)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Dummy login: username: user, password: 1234
    if (username === 'user' && password === '1234') {
      dispatch(login({ username }))
      navigate('/profile')
    } else {
      dispatch(setError('Kullanıcı adı veya şifre hatalı'))
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Giriş Yap</h2>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full mb-3 px-3 py-2 border rounded"
          required
        />
        {error && <div className="text-red-500 text-sm mb-2">{error}</div>}
        <button type="submit" className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition-colors">Giriş Yap</button>
      </form>
    </div>
  )
}

export default Login
