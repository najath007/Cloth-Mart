import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import likeReducer from "../features/likeSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    like: likeReducer
  },
});
