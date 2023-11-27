import { createSlice, PayloadAction, current } from '@reduxjs/toolkit'

export type CartItemType = {
  id: number,
  name: string,
  image: string,
  price: string,
  productType: string,
  size: string | undefined,
  sku: number | undefined,
  quantity: number
}

type InitialState = {
  value: CartItemType[]
}

const initialState = {
  value: []
} as InitialState

export const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action:PayloadAction<CartItemType>) => {
      state.value.push(action.payload)

      console.log('from redux store:', state.value)
    },
    removeFromCart: () => {}
  }
})

export const { addToCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer