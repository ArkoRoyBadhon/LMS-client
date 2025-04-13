import {
  createApi,
  fetchBaseQuery,
  FetchArgs,
} from "@reduxjs/toolkit/query/react";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { logout } from "../features/auth/AuthSlice";
import { Router } from "next/router";

export const baseUrl = "http://localhost:5000/api/v1";

type ExtraOptionsWithRouter = {
  router?: Router;
};

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  unknown,
  ExtraOptionsWithRouter
> = async (args, api, extraOptions) => {
  const result = await fetchBaseQuery({
    baseUrl: baseUrl,
    credentials: "include",
  })(args as FetchArgs, api, extraOptions);

  if (result.error?.status === 401) {
    await fetchBaseQuery({
      baseUrl: baseUrl,
      credentials: "include",
    })({ url: "/auth/logout", method: "POST" } as FetchArgs, api, extraOptions);

    api.dispatch(logout());

    if (extraOptions?.router) {
      extraOptions.router.push("/login");
    }
  }

  return result;
};

export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["user", "enrollment", "course", "module", "lecture"],
  endpoints: () => ({}),
});
