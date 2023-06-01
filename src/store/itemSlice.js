import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  testvalue: "just test",
  loading: false,
  cartOpen: false,
  cartItems: [],
  checkoutOpen: false,
  sort: "az",
};

export const itemSlice = createSlice({
  name: "items",
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setLoading: (state, action) => {
      if (!action.payload) {
        state.loading = !state.loading;
      } else {
        state.loading = action.payload;
      }
    },
    setCartOpen: (state, action) => {
      state.cartOpen = action.payload;
    },
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },
    setCheckoutOpen: (state, action) => {
      state.checkoutOpen = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
  },
});

export const {
  setItems,
  setLoading,
  setCartOpen,
  setCartItems,
  setCheckoutOpen,
  setSort,
} = itemSlice.actions;

export default itemSlice.reducer;
