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
      const { id, size } = action.payload;

      // Check if the item is already in the cart
      const existingCartItemIndex = state.value.findIndex(
        (item) => item.id === id && item.size === size
      );

      if (existingCartItemIndex !== -1) {
        // If the item is already in the cart, update the quantity
        state.value[existingCartItemIndex].quantity += 1;
      } else {
        // If the item is not in the cart, add it with the initial quantity
        state.value.push({ ...action.payload, quantity: 1 });
      }

      console.log('from redux store:', state.value);
    },
    removeFromCart: () => {}
  }
})

export const { addToCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer