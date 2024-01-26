import { configureStore } from '@reduxjs/toolkit'
import { baseapi } from '../services/api'

export const store = configureStore({
  reducer: {
    [baseapi.reducerPath]: baseapi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(baseapi.middleware),
})