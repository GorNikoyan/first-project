import { createSlice } from "@reduxjs/toolkit";
import {deleteFetchCartProduct, editFetchCartProductCount, getFetchCart,postFetchCart} from "./cartDataApi.js"
const cartSlice = createSlice({
    name:"cartData",
    initialState:{
        cart:[]
    },
    reducers:{},
    extraReducers: (builder) =>{
        builder
        .addCase(getFetchCart.fulfilled, (state,{payload}) => {
            state.cart = payload
        })
        .addCase(postFetchCart.fulfilled, (state,{payload}) => {
            state.cart = [
                ...state.cart,
                {   
                    id: payload.id,
                    userId:payload.userId,
                    productId: payload.productId,
                    title: payload.title,
                    price: payload.price,
                    description: payload.description,
                    category: payload.category,
                    image: payload.image,
                    count: payload.count,
                    totalAmount: payload.totalAmount,
                    rating: payload.rating ? payload.rating : ''
                }]
        })
        .addCase(deleteFetchCartProduct.fulfilled,(state,{payload}) => {
            state.cart =  [...state.cart.filter(product => product.id !== payload)]
        })
        .addCase(editFetchCartProductCount.fulfilled, (state,{payload}) => {
            state.cart =  [...state.cart.map(product => product.id === payload.id ? payload : product)]
        })
    }
})
export const selectCartData = state => state.cartData;
export const {} = cartSlice.actions;
export const cartDataReducer = cartSlice.reducer;

