import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'
import productReducer from './slices/productSlice'

export const store = configureStore({
  reducer: {
    products: productReducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store
