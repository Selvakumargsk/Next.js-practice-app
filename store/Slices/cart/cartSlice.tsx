import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface CartItem {
    id: number;
    image: string;
    name: string;
    price: number;
    quantity: number;
  }

export interface CartState {
  value: CartItem[]
}

const initialState: CartState = {
  value: [],
}

export const CartSlice = createSlice({
  name: 'Cart',
  initialState,
  reducers: {
    AddToCart : (state , action:PayloadAction<CartItem>) =>{
        const { id } = action.payload;
        const existingItem = state.value.find((item) => item.id === id);
        if(existingItem){
            existingItem.quantity +=1;
        }else{
            state.value.push(action.payload)
        }
    },
  },
})

export const { AddToCart } = CartSlice.actions

export default CartSlice.reducer