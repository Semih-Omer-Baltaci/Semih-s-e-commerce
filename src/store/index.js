import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import productReducer from './slices/productSlice'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store