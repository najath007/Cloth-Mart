import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], 
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const exist = state.cartItems.find((p) => p.id === item.id);

      if (!exist) {
        state.cartItems.push({ ...item, qty: 1 });
      } 
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((p) => p.id !== id);
    },

    increaseQty: (state, action) => {
      const product = state.cartItems.find((p) => p.id === action.payload);
      if (product) product.qty += 1;
    },

    decreaseQty: (state, action) => {
      const product = state.cartItems.find((p) => p.id === action.payload);
      if (product && product.qty > 1) product.qty -= 1;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQty,
  decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;
