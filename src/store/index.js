import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'

export const store = configureStore({
  reducer: {
    // Add your reducers here
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk)
})

export default store
