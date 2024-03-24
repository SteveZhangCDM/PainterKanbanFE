import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3001/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "api/users",
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Users", _id })), "Users"]
          : ["Users"],
    }),
    addNewUser: builder.mutation({
      query: (newUserData) => ({
        url: "api/users",
        method: "POST",
        body: newUserData,
      }),
      invalidatesTags: ["Users"],
    }),
    updateUserRole: builder.mutation({
      query: ({ userId, role }) => ({
        url: `api/users/${userId}`,
        method: "PUT",
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),
    toggleUserActive: builder.mutation({
      query: ({ userId, isActive }) => ({
        url: `api/users/${userId}/${isActive ? "enable" : "disable"}`,
        method: "PUT",
      }),
      invalidatesTags: ["Users"],
    }),
    login: builder.mutation({
      query: (credentials) => ({
        url: "api/users/login",
        method: "POST",
        body: credentials,
      }),
    }),
  }),
});

export const {
  useGetUsersQuery,
  useLoginMutation,
  useAddNewUserMutation,
  useUpdateUserRoleMutation,
  useToggleUserActiveMutation,
} = adminApi;
