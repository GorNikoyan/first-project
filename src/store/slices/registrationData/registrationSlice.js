import { createSlice } from "@reduxjs/toolkit";
import { deleteFetchUser, editFetchBlockedUser, editFetchUser, getBlockedFetchUser, getFetchUser, postBlockedFetchUser, postFetchUser, unBlockFetchUser } from "./registrationDataApi";

const registrationSlice = createSlice({
    name: 'registrationData',
    initialState: {
        usersData:[],
        currentUser: null,
        isAdminAuth:false,
        editingUser: null,
        blockedUsers:[]
    },
    reducers: {
        isAuthAdmin(state,{payload}){
            // console.log(payload)
            state.isAdminAuth = payload
        },
        getCurrentUser(state,{payload}){
            // console.log(payload)
            state.currentUser = payload
        },
        getEditingUser(state,{payload}){
            // console.log(payload)
            state.editingUser = payload
        },
        blockUser(state,{payload}){
            // console.log(payload)
            // state.editingUser = payload
        }
        // deleteUser(state,{payload}){
        //     state.data =  [...state.usersData.filter(user => user.id !== payload)]
        // }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(getFetchUser.fulfilled, (state,{payload}) => {
            state.usersData = payload
        })
        .addCase(deleteFetchUser.fulfilled,(state,{payload}) => {
           state.usersData =  [...state.usersData.filter(user => user.id !== payload)]
        })
        .addCase(postFetchUser.fulfilled, (state,{payload}) => {
            state.usersData =  [
                ...state.usersData,
                {
                    id: payload.id,
                    name: payload.name,
                    lastname: payload.lastname,
                    login: payload.login,
                    password: payload.password,
                    email:payload.email,
                    avatar: payload.avatar
                }
            ]
            state.editingUser = null
        })
        .addCase(editFetchUser.fulfilled, (state,{payload}) => {
            // console.log(payload.name);
            state.usersData =  [...state.usersData.map(user => user.id === payload.id ? payload : user)]
            state.editingUser = null
        })
        .addCase(getBlockedFetchUser.fulfilled, (state,{payload}) => {
            state.blockedUsers = payload
        })
        .addCase(postBlockedFetchUser.fulfilled, (state,{payload}) => {
            state.blockedUsers = [
                ...state.blockedUsers,
                { 
                    id: payload.id,
                    name: payload.name,
                    lastname: payload.lastname,
                    login: payload.login,
                    password: payload.password,
                    email:payload.email,
                    avatar: payload.avatar
                }
            ]
        })
        .addCase(unBlockFetchUser.fulfilled, (state,{payload}) => {
            state.blockedUsers = [...state.blockedUsers.filter(user => user.id !== payload)]
        })
        .addCase(editFetchBlockedUser.fulfilled, (state,{payload}) => {
            state.blockedUsers =  [...state.blockedUsers.map(user => user.id === payload.id ? payload : user)]
            state.editingUser = null
        })
    }
})

export const selectregisterData = state => state.registrationData;
export const {isAuthAdmin,deleteUser,getCurrentUser,getEditingUser,blockUser} = registrationSlice.actions;
export const registerDataReducer = registrationSlice.reducer;