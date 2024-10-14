import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState: {
  isFromCartProceed: boolean;
} = {
  isFromCartProceed: false,
};

const checkFromCartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setIsFromCartProceed: (state, action) => {
      state.isFromCartProceed = action.payload;
    },
  },
});

export const { setIsFromCartProceed } = checkFromCartSlice.actions;
export const wereItFromCheckout = (state: RootState) =>
  state.checkFromCart.isFromCartProceed;
export default checkFromCartSlice.reducer;
