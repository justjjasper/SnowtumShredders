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
    removeItemFromCart: (state, action: PayloadAction<CartItemType>) => {
      const { id, size } = action.payload
      const itemIndex = state.value.findIndex(item => item.id === id && item.size === size)

      if (itemIndex !== -1) {
        // Check if the item exists before updating
        if (state.value[itemIndex].quantity > 1) {
          state.value[itemIndex].quantity -= 1;
          console.log('backend triggered');
        } else {
          // If quantity is 1, remove the item from the cart
          state.value.splice(itemIndex, 1);
          console.log('backend triggered for removal');
        }
      }

      console.log('blacen triggered after')
    }
  }
})

export const { addToCart, removeItemFromCart } = cartSlice.actions
export const cartReducer = cartSlice.reducer