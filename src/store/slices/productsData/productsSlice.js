import { createSlice } from "@reduxjs/toolkit";
import { deleteFetchProduct, editFetchProduct, fetchProducts, getFetchProducts, postFetchProducts } from "./productsDataApi";

const productsSlice = createSlice({
    name:'productsData',
    initialState: {
        products:[]
    },
    reducers: {

    },
    extraReducers: (builder) =>{
        builder
        .addCase(getFetchProducts.fulfilled, (state,{payload}) => {
            state.products = payload
        })
       .addCase(postFetchProducts.fulfilled, (state,{payload}) => {
        state.products = [...state.products,{
            id:payload.id,
            title:payload.title,
            price:payload.price,
            description: payload.description,
            category:payload.category,
            image:payload.image,
            rating:payload.rating ? payload.rating : ''
        }]
        })
        .addCase(deleteFetchProduct.fulfilled,(state,{payload}) => {
            state.products =  [...state.products.filter(product => product.id !== payload.id)]
         })
        .addCase(editFetchProduct.fulfilled, (state,{payload}) => {
            // console.log(payload.name);
            state.products =  [...state.products.map(product => product.id === payload.id ? payload : product)]
            // state.editingUser = null
        })
    }
})

export const selectProductsData = state => state.productsData;
export const {} = productsSlice.actions;
export const productsDataReducer = productsSlice.reducer;
