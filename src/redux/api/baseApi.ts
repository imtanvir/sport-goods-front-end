import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TFeedback } from "../../utils/interface";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1" }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/product/get-products",
        method: "GET",
      }),
    }),
    sendFeedback: builder.mutation({
      query: (feedback: TFeedback) => ({
        url: "/product/send-feedback",
        method: "POST",
        body: { ...feedback },
      }),
    }),
  }),
});

export const { useGetProductsQuery, useSendFeedbackMutation } = baseApi;
