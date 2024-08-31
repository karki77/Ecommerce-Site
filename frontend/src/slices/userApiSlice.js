import { apiSlice } from "./apiSlice";
import { USER_URL } from "../constants";
import { logout } from "./authSlice";


const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/login`,
                method: 'POST',
                body: data
            }),
        }),
        userlogout: builder.mutation({
            query: () => ({
                url: `${USER_URL}/logout`,
                method: 'POST',
            
            }),
        }),
        updateUserProfile: builder.mutation({
            query: (data) => ({
                url: `${USER_URL}/profile`,
                method: "PUT",
                body: data,
            }),
        }),
    }),
});

export const {useLoginMutation, useUserlogoutMutation,useUpdateUserProfileMutation} = usersApiSlice;