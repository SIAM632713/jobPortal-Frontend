import {configureStore} from "@reduxjs/toolkit";
import authAPI from "@/redux/feature/authAPI/authAPI.js";
import authReducer from "../feature/authAPI/authSlice.jsx"
import jobAPI from "@/redux/feature/jobAPI/jobAPI.js";
import applicationAPI from "@/redux/feature/applicationAPI/applicationAPI.js";
import companyAPI from "@/redux/feature/companyAPI/companyAPI.js";


export const store=configureStore({
    reducer:{
        [authAPI.reducerPath]:authAPI.reducer,
        auth:authReducer,
        [jobAPI.reducerPath]:jobAPI.reducer,
        [applicationAPI.reducerPath]:applicationAPI.reducer,
        [companyAPI.reducerPath]:companyAPI.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(authAPI.middleware,jobAPI.middleware,applicationAPI.middleware,companyAPI.middleware)
})