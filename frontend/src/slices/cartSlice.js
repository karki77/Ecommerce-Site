import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/CartUtils";

// const initialState = {
//     cartItems: localStorage.getItem("cart")
//      ? JSON.parse(localStorage.getItem("cart")): [],
// };

const initialState = localStorage.getItem("cart")
 ? JSON.parse(localStorage.getItem('cart'))
: {
    cartItems: [],
     shippingAddress: {}
    };


const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            let newItem = action.payload
           let existingItem = state.cartItems.find(
           (item) => item._id ===newItem._id 
           );
           if(existingItem){
              state.cartItems = state.cartItems.map((item) =>
             item._id === existingItem._id ? newItem:item
            );  
           } else { 
            state.cartItems = [...state.cartItems,newItem]
           }
       
            return updateCart(state);
        },

        removeItem: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter(item => item._id != itemId)
            return updateCart(state);
        },
        emptyCart:(state, action) => {
            state.cartItems = [];
            localStorage.setItem('cart', JSON.stringify(state))
        },
        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload
            localStorage.setItem('cart',JSON.stringify(state))
        }
    }
});

export const {addToCart, removeItem, emptyCart, saveShippingAddress} = cartSlice.actions;
export default cartSlice.reducer;
