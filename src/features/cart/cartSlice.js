import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: [], // {id, title, price, image, quantity}
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload
      const quantity = item.quantity || 1
      
      const existing = state.items.find(i => i.id === item.id)
      if (existing) {
        existing.quantity += quantity
      } else {
        state.items.push({ ...item, quantity })
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(i => i.id !== action.payload)
    },
    clearCart: (state) => {
      state.items = []
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload)
      if (item && item.quantity > 1) {
        item.quantity -= 1
      } else {
        state.items = state.items.filter(i => i.id !== action.payload)
      }
    }
  }
})

export const { addToCart, removeFromCart, clearCart, decreaseQuantity } = cartSlice.actions
export default cartSlice.reducer
