import { createAsyncThunk } from "@reduxjs/toolkit";

export const getFetchUser = createAsyncThunk(
    'registrationData/getFetchUser',
    async () => {
        const result = await fetch('http://localhost:3001/users')
        const userData = await result.json()
        return userData;
    }
)

export const postFetchUser = createAsyncThunk(
    'registrationData/postUser',
    async (data) => {
        const result = await fetch('http://localhost:3001/users', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body:JSON.stringify(data)
        })
        return data
    }
)
export const deleteFetchUser = createAsyncThunk(
    'registrationData/deleteUser',
    async (id) => {
        const result = await fetch(`http://localhost:3001/users/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            },  
        })
        return id
    }
)
export const editFetchUser = createAsyncThunk(
    'registrationData/editFetchUser',
    async (editData) => {
        const result = await fetch(`http://localhost:3001/users/${editData.id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify(editData)
        })
        return editData
    }
)
export const getBlockedFetchUser = createAsyncThunk(
    'registrationData/getBlockedFetchUser',
    async () => {
        const result = await fetch('http://localhost:3001/blockedUsers')
        const blockedUserData = await result.json()
        return blockedUserData;
    }
)
export const postBlockedFetchUser = createAsyncThunk(
    'registrationData/postBlockedFetchUser',
    async (data) => {
        const result = await fetch('http://localhost:3001/blockedUsers', {
            method: 'POST',
            headers: {
                "Content-type": "application/json",
            },
            body:JSON.stringify(data)
        })
        return data
    }
)
export const unBlockFetchUser = createAsyncThunk(
    'registrationData/unblockFetchUser',
    async (id) => {
        const result = await fetch(`http://localhost:3001/blockedUsers/${id}`, {
            method: 'DELETE',
            headers: {
                "Content-type": "application/json",
            },  
        })
        return id
    }
)
export const editFetchBlockedUser = createAsyncThunk(
    'registrationData/editFetchBlockedUser',
    async (editData) => {
        const result = await fetch(`http://localhost:3001/blockedUsers/${editData.id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify(editData)
        })
        return editData
    }
)