import { getMyOrders, getOrderById } from "../../../backend/controller/order.controller";
import { ORDER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        placeOrder: builder.mutation({
            query: (order) => ({
                url: `${ORDER_URL}/addorder`,
                method: "POST",
                body: {...order},
            }),
        }),
        getOrderById: builder.query({
            query:(id) => ({
                url: `${ORDER_URL}/${id}`
            }),
        }),
        getMyOrders: builder.query({
            query:() => ({
                url: `${ORDER_URL}/myorders`,
            }),
        }),
        getAllOrders: builder.query({
            query: () => ({
                url: ORDER_URL,
            }),
        }),
        changeStatus:builder.mutation({
            query: (data) => {
                console.log(data.id);
                console.log(data.body);
                return{ 
                url:`${ORDER_URL}/${data.id}/changestatus`,
                method: "PUT",
                body: data.body,
               };
            },
        }),
    }),
});

export const {usePlaceOrderMutation, useGetOrderByIdQuery, useGetMyOrdersQuery, useGetAllOrdersQuery, useChangeStatusMutation} = orderSlice;

