import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { cartReducer } from './features/cart-slice'
import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { preloadedState } from './features/preloadedState'

const rootReducer = combineReducers({
  cart: cartReducer
})

export const store = configureStore({
  reducer: rootReducer,
  preloadedState
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector