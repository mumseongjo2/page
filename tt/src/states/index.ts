import { configureStore } from '@reduxjs/toolkit'
import minesweeper from '@states/minesweeper'

const store = configureStore({
  reducer: { minesweeper },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
