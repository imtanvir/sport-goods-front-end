import { createSlice } from "@reduxjs/toolkit";

type TProduct = {
  name: null | string;
  description: null | string;
  price: null | number;
  stock_quantity: null | number;
  category: null | string;
  brand: null | string;
  rating: null | number;
};

type TInitialState = TProduct[];
const initialState: TInitialState = [{
  name: null,
  description: null,
  price: null,
  stock_quantity: null,
  category: null,
  brand: null,
  rating: null,
}];
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      state = [...state, action.payload];
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;

export const  = (state: RootState) => state.auth.user;