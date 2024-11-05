import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8080',
        prepareHeaders: (headers) => {
           
            const token = sessionStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: () => 'user',
        }),
        getUserById: builder.query({
            query: (id) => `user/id/${id}`,
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `user/id/${id}`,
                method: 'DELETE',
            }),
        }),
        createUser: builder.mutation({
            query: (userData) => ({
                url: '/products',
                method: 'POST',
                body: userData,
            }),
        }),
        updateUser: builder.mutation({
            query: ({ id, ...data }) => ({
                url: `/user/${id}`,
                method: 'PUT',
                body: data,
            }),
        }),
        getAttendance: builder.query({
            query: () => 'attendance',
        }),
        postAttendance: builder.mutation({
            query: (attendanceData) => ({
                url: 'attendance/addattendance',
                method: 'POST',
                body: attendanceData,
            }),
        }),
        deleteAttendance: builder.mutation({
            query: (id) => ({
                url: `attendance/id/${id}`,
                method: 'DELETE',
            }),
        }), 
        getPresent: builder.query({
            query: () => `attendance/present`,
        }),   
        getLeave: builder.query({
            query: () => `attendance/leave`,
        }), 
        getAbsent: builder.query({
            query: () => `attendance/absent`,
        }),     
    }),
});

export const {
    useGetUsersQuery, useGetUserByIdQuery,useDeleteUserMutation,useCreateUserMutation,
    useUpdateUserMutation,useGetAttendanceQuery,usePostAttendanceMutation,useDeleteAttendanceMutation,
    useGetPresentQuery,useGetLeaveQuery,useGetAbsentQuery
} = productsApi;
