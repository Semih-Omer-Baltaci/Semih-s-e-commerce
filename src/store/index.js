import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import productReducer from './slices/productSlice'
import cartReducer from '../features/cart/cartSlice'
import authReducer from '../features/auth/authSlice'
import ordersReducer from '../features/orders/ordersSlice'
import paymentReducer from '../features/payment/paymentSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    orders: ordersReducer,
    payment: paymentReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store