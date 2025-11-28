import { configureStore } from "@reduxjs/toolkit";
import productsRaducer from "../features/productSlice";

export const store = configureStore({
    reducer:{
        products: productsRaducer
    }
})