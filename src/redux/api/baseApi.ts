import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { TFeedback } from "../../utils/interface";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BASE_URL,
    credentials: "omit",
  }),
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create-product",
        method: "POST",
        body: data,
      }),
    }),
    getProducts: builder.query({
      query: () => ({
        url: `/product/get-products`,
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
    makePayment: builder.mutation({
      query: (amount) => ({
        url: "/payment/checkout",
        method: "POST",
        body: amount,
      }),
    }),
    updateProductQuantity: builder.mutation({
      query: (data) => ({
        url: "/product/update-product-quantity",
        method: "POST",
        body: data,
      }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/product/delete-product/${id}`,
        method: "DELETE",
      }),
    }),
    updateSingleProduct: builder.mutation({
      query: ({ id, data }) => ({
        url: `/product/${id}`,
        method: "PUT",
        body: data,
        credentials: "omit",
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useSendFeedbackMutation,
  useMakePaymentMutation,
  useUpdateProductQuantityMutation,
  useDeleteProductMutation,
  useUpdateSingleProductMutation,
} = baseApi;
