import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk(
    'productsData/fetchProducts',
    async function() {
        const result = await fetch('https://fakestoreapi.com/products');
        const jsonRes = await result.json();
        return jsonRes
    }
)
export const getFetchProducts = createAsyncThunk(
    'productsData/getFetchProducts',
    async function() {
        const result = await fetch('http://localhost:3001/products');
        const jsonRes = await result.json();
        return jsonRes
    }
)
export const postFetchProducts = createAsyncThunk(
    'productsData/postFetchProducts',
    async (data) => {
        const result = await fetch('http://localhost:3001/products', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body:JSON.stringify(data)
        })
        return result.json()
    }
)
export const editFetchProduct = createAsyncThunk(
    'productsData/editFetchProduct',
    async (editData) => {
        const result = await fetch(`http://localhost:3001/products/${editData.id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify(editData)
        })
        return result.json()
    }
)
export const deleteFetchProduct = createAsyncThunk(
    'productsData/deleteFetchProduct',
    async (id) => {
        const result = await fetch(`http://localhost:3001/products/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            },  
        })
        return result.json()
    }
)