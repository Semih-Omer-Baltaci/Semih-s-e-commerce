import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null, // { username: '...' }
  isAuthenticated: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = {
        username: action.payload.username,
        email: action.payload.email || 'user@example.com',
        avatar: action.payload.avatar || `https://randomuser.me/api/portraits/men/1.jpg`
      }
      state.isAuthenticated = true
      state.error = null
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.error = null
    },
    setError: (state, action) => {
      state.error = action.payload
    }
  }
})

export const { login, logout, setError } = authSlice.actions
export default authSlice.reducer
