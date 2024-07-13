import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TProduct = {
  name: null | string;
  description: null | string;
  price: null | number;
  stock_quantity: null | number;
  category: null | string;
  brand: null | string;
  rating: null | number;
};

type TInitialState = {
  products: TProduct[];
};
const initialState: TInitialState = {
  products: [],
};
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<TProduct>) => {
      state.products = [...state.products, action.payload];
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;

export const products = (state: RootState) => state.products;
