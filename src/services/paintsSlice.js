import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const baseUrl = import.meta.env.VITE_API_BASE_URL;

export const paintApi = createApi({
  reducerPath: "paintApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getPaints: builder.query({
      query: () => "api/paints",
      providesTags: (result) =>
        result
          ? [...result.map(({ _id }) => ({ type: "Paint", _id })), "Paint"]
          : ["Paint"],
    }),
    updatePaintStatus: builder.mutation({
      query: ({ color, status }) => ({
        url: `api/paints/${color}/status`,
        method: "PUT",
        body: { status },
      }),
      invalidatesTags: ["Paint"],
    }),
    updatePaintInventory: builder.mutation({
      query: ({ color, quantity }) => ({
        url: `api/paints/${color}/inventory`,
        method: "PUT",
        body: { quantity },
      }),
      invalidatesTags: ["Paint"],
    }),
    bulkUpdatePaints: builder.mutation({
      query: (bulk) => ({
        url: "/api/paints/bulk-update",
        method: "PUT",
        body: { bulk: bulk },
      }),
      invalidatesTags: ["Paint"],
    }),
  }),
});

export const {
  useGetPaintsQuery,
  useUpdatePaintStatusMutation,
  useUpdatePaintInventoryMutation,
  useBulkUpdatePaintsMutation,
} = paintApi;
