import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TImage } from "../../../utils/interface";
import { RootState } from "../../store";

type TProduct = {
  _id: string;
  name: null | string;
  description: null | string;
  price: null | number;
  stock_quantity: null | number;
  category: null | string;
  brand: null | string;
  rating: null | number;
  image: TImage[];
};

type CartProduct = {
  product: TProduct;
  quantity: number;
};

type ProductState = {
  products: TProduct[];
};

const initialState: ProductState = {
  products: [],
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<TProduct>) => {
      state.products = [...state.products, action.payload];
    },
    updateProductStock: (state, action: PayloadAction<CartProduct[]>) => {
      const orderedProducts = action.payload;
      state.products = state.products.map((product) => {
        const orderedProduct = orderedProducts.find(
          (item) => item.product._id === product._id
        );
        if (orderedProduct) {
          return {
            ...product,
            stock_quantity:
              (product.stock_quantity || 0) - orderedProduct.quantity,
          };
        }
        return product;
      });
    },
  },
});

export const { setProduct, updateProductStock } = productSlice.actions;
export const allProducts = (state: RootState) => state.product.products;
export default productSlice.reducer;
