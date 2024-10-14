import { createSlice } from "@reduxjs/toolkit";
import { TImage } from "../../../utils/interface";
import { RootState } from "../../store";

export type TProductManagement = {
  _id: string;
  name: string | null;
  description: string | null;
  price: number | null;
  stock_quantity: number | null;
  category: string | null;
  brand: string | null;
  rating: number | null;
  image: TImage[];
};

type ProductState = {
  products: TProductManagement[];
};

const initialState: ProductState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProductsIs: (state, action) => {
      const { data } = action.payload;
      state.products = data;
    },
  },
});

export const { setProductsIs } = productsSlice.actions;
export const storeProducts = (state: RootState) => state.products.products;
export default productsSlice.reducer;
