import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  orderHistory: [], // [{ id, date, items: [{id, title, price, image, quantity}], totalAmount }]
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    placeOrder: (state, action) => {
      const { items, totalAmount } = action.payload
      const orderId = `order-${Date.now()}`
      const orderDate = new Date().toISOString()
      
      state.orderHistory.push({
        id: orderId,
        date: orderDate,
        items: [...items],
        totalAmount
      })
    }
  }
})

export const { placeOrder } = ordersSlice.actions
export default ordersSlice.reducer
