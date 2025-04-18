import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  savedCards: [] // [{ id, lastFourDigits, cardholderName, expiryMonth, expiryYear }]
}

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    addCreditCard: (state, action) => {
      // Check if card already exists (by last four digits)
      const lastFour = action.payload.lastFourDigits
      const existingCard = state.savedCards.find(
        card => card.lastFourDigits === lastFour && 
               card.cardholderName === action.payload.cardholderName
      )
      
      if (!existingCard) {
        state.savedCards.push(action.payload)
      }
    },
    removeCreditCard: (state, action) => {
      state.savedCards = state.savedCards.filter(card => card.id !== action.payload)
    }
  }
})

export const { addCreditCard, removeCreditCard } = paymentSlice.actions
export default paymentSlice.reducer
