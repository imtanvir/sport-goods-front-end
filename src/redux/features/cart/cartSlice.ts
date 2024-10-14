import { createSlice } from "@reduxjs/toolkit";
import { TProduct } from "../../../utils/interface";
import { RootState } from "../../store";

export type TCart = {
  product: TProduct;
  quantity: number;
  total: number;
};

const initialState: {
  cartProducts: TCart[];
} = {
  cartProducts: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartData: (state, action) => {
      state.cartProducts = action.payload.data;
    },
    incrementQuantity: (state, action) => {
      const item = state.cartProducts.find(
        (item) => item.product._id === action.payload.id
      );
      if (item) {
        item.quantity += 1;
        item.total = item.product.price * item.quantity;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.cartProducts.find(
        (item) => item.product._id === action.payload.id
      );
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        item.total = item.product.price * item.quantity;
      }
    },
    removeItem: (state, action) => {
      state.cartProducts = state.cartProducts.filter(
        (item) => item.product._id !== action.payload.id
      );
    },
  },
});

export const { setCartData, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
export const allCartData = (state: RootState) => state.cart.cartProducts;
export default cartSlice.reducer;
