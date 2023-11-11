import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFetchCart = createAsyncThunk(
    'cartData/getFetchCart',
    async () => {
        const result = await fetch(`http://localhost:3001/cart`)
        const cartData = await result.json()
        return cartData;
    }
)
export const postFetchCart = createAsyncThunk(
    'cartData/postFetchCart',
    async (data) => {
        const result = await fetch('http://localhost:3001/cart', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body:JSON.stringify(data)
        })
        return data
    }
)
export const deleteFetchCartProduct = createAsyncThunk(
    'cartData/deleteFetchCartProduct',
    async (id) => {
        const result = await fetch(`http://localhost:3001/cart/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            },  
        })
        return id
    }
)
export const editFetchCartProductCount = createAsyncThunk(
    'cartData/editFetchCartProductCount',
    async (editData) => {
        const result = await fetch(`http://localhost:3001/cart/${editData.id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify(editData)
        })
        return editData
    }
)
