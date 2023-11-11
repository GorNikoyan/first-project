import {configureStore} from "@reduxjs/toolkit"
import { registerDataReducer } from "./slices/registrationData/registrationSlice";
import { productsDataReducer } from "./slices/productsData/productsSlice";
import { cartDataReducer } from "./slices/cartData/cartSlice";
const store = configureStore({
    reducer:{
        registrationData:registerDataReducer,
        productsData: productsDataReducer,
        cartData:cartDataReducer,
    }

})
export default store;