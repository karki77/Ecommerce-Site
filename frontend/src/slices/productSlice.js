import { ORDER_URL, PRODUCT_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const productSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: () => ({
                url:PRODUCT_URL,
            }),
            providesTags: ["Product"],
        }),
      getProductById: builder.query({
          query: (id) => ({
             url: `${PRODUCT_URL}/${id}`,
          }),
      }),
      addProduct: builder.mutation({
        query: () => ({
            url: `${PRODUCT_URL}`,
            method: "POST",
        }),
        invalidatesTags:["Product"],
      }),
      updateProduct: builder.mutation({
        query: (product) => ({
          url: `${PRODUCT_URL}/${product._id}`,
          method: "PUT",
          body: product,
        }),
        invalidatesTags: ["Product"],
    }),
    uploadProductImage: builder.mutation({
        query: (data) => ({
            url: UPLOAD_URL,
            method : "POST",
            body: data,
        }),
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
        
      }), 
      invalidatesTags: ['Product'],
    }),
    addReview: builder.mutation({
        query: (data) => ({
            url: `${PRODUCT_URL}/addreview/${data._id}`,
            method: "PUT",
            body: data
        }),
      invalidatesTags: ['Product'],
    }),
    checkReviewStatus: builder.query({
        query: (id) => ({
            url: `${PRODUCT_URL}//${id}/check-review-status`,

        }),
    }),
  }),
});

export const {useGetProductsQuery,
             useGetProductByIdQuery,
              useAddProductMutation, 
              useUpdateProductMutation, 
              useUploadProductImageMutation,
               useDeleteProductMutation,
                useAddReviewMutation,
                useCheckReviewStatusQuery} = productSlice;