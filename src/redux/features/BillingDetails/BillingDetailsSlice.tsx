import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

type TBillingDetails = {
  email: string;
  name: string;
  address: {
    city: string;
  };
  phone: string;
};

const initialState: {
  billingDetails: TBillingDetails | null;
} = {
  billingDetails: null,
};

const billingDetailsSlice = createSlice({
  name: "billingDetails",
  initialState,
  reducers: {
    setDetails: (state, action: PayloadAction<TBillingDetails>) => {
      state.billingDetails = action.payload;
    },
  },
});

export const { setDetails } = billingDetailsSlice.actions;

export const billingDetails = (state: RootState) =>
  state.billingDetails.billingDetails;

export default billingDetailsSlice.reducer;
