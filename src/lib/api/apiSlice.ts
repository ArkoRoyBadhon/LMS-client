import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseUrl = "http://localhost:5000/api/v1";

const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  credentials: "include",
});

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: ["user", "enrollment"],
  endpoints: () => ({}),
});
